import express from 'express'
import isAuthenticate from '../middlewares/isAuthenticated.js';
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook } from '../controllers/purchaseCourse.controller.js';
const purchaseCourseRouter = express.Router()
purchaseCourseRouter.post("/checkout/create-checkout-session" , isAuthenticate , createCheckoutSession)
purchaseCourseRouter.post('/webhook' , express.raw({type:"application/json"}),stripeWebhook)
purchaseCourseRouter.get('/course/:courseID/detail-with-status'  ,isAuthenticate , getCourseDetailWithPurchaseStatus)
purchaseCourseRouter.get("/" , isAuthenticate , getAllPurchasedCourse)

export default purchaseCourseRouter;