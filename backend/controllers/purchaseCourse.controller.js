import Stripe from "stripe";
import Course from "../models/course.model.js";
import PurchasedCourse from "../models/purchaseCourse.model.js";
import Lecture from "../models/lecture.model.js";
import User from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const userID = req.userId;
    const { courseID } = req.body;
    console.log(userID , courseID);
    const course = await Course.findById(courseID);
    if (!course) return res.status(400).json({ msg: "course not  found" });
    const newPurchase = new PurchasedCourse({
      courseID: courseID,
      userID: userID,
      amount: course.coursePrice,
      status: "Pending",
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/course-detail/${courseID}`,
      cancel_url: `http://localhost:5173/course-progress/${courseID}`,
      metadata: {
        courseID,
        userID,
      },
    });
    if (!session.url) {
      return res
        .status(400)
        .json({ msg: "error while creating stripe session" });
    }
    newPurchase.paymentID = session.id;
    await newPurchase.save();

    return res
      .status(200)
      .json({ msg: "session created successfully", url: session.url });
  } catch (error) {
    console.log(error);
    return res.end();
  }
};

const stripeWebhook = async (req, res) => {
  let event;

  try {
    const payloadString = JSON.stringify(req.body);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });
    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.log("webhook error", error);
    return res.status(400).json({ msg: "stripe webhook problem" });
  }
  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object;
      const purchasedCourse = await PurchasedCourse.findOne({
        paymentID: session.id,
      }).populate({ path: "courseID" });
      if (!purchasedCourse) {
        return res.status(400).json({ msg: "purchased course not found." });
      }
      if (session.amount_total) {
        purchasedCourse.amount = session.amount_total / 100;
      }
      purchasedCourse.status = "Completed";
      if (
        purchasedCourse.courseID &&
        purchasedCourse.courseID.lectures.length > 0
      ) {
        await Lecture.updateMany(
          { _id: { $in: purchasedCourse.courseID.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }
      await purchasedCourse.save();
      await User.findByIdAndUpdate(
        purchasedCourse.userID,
        { $addToSet: { enrolledCourses: purchasedCourse.courseID._id } },
        { new: true }
      );
      await Course.findByIdAndUpdate(
        purchasedCourse.courseID,
        { $addToSet: { enrolledStudents: purchasedCourse.userID } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "internal server error. please try again later" });
    }
  }
};

const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseID } = req.params;
    const userID = req.userId;
    const course = await Course.findById(courseID)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });
    if (!course) {
      return res.status(400).json({ msg: "course not found" });
    }
    const purchasedCourse = await PurchasedCourse.findOne({ userID, courseID });
    return res.status(200).json({
      course,
      purchaseStatus:!!purchasedCourse
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "internal server error. please try again later" });
  }
};

const getAllPurchasedCourse = async (req, res) => {
  try {
    const purchasedCourse = await PurchasedCourse.find({
      status: "Completed",
    }).populate({ path: "courseID" });
    if (!purchasedCourse || purchasedCourse.length == 0) {
      return res.status(400).json({ msg: "course not found" });
    }
    return res.status(200).json({ msg: "course found", purchasedCourse });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "internal server error. please try again later" });
  }
};

export {
  createCheckoutSession,
  stripeWebhook,
  getCourseDetailWithPurchaseStatus,
  getAllPurchasedCourse,
};
