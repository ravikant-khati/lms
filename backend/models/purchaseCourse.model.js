import mongoose from "mongoose";

const coursePurchaseSchema = new mongoose.Schema(
  {
    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      Enumerator: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    paymentID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const PurchasedCourse = mongoose.model("PurchasedCourse", coursePurchaseSchema);

export default PurchasedCourse;
