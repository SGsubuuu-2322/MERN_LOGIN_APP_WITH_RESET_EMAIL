import { Router } from "express";
import * as controller from "../controller/appControllers.js";
import * as middleware from "../middleware/auth.js";
import registerMail from "../controller/mailer.js";

const router = Router();

// POST Methods
router.route("/register").post(controller.register); //use to register a user...

router.route("/registerMail").post(registerMail); //use to send the mail
router
  .route("/authenticate")
  .post(controller.verifyUser, (req, res) => res.end()); //use to authenticate a user
router.route("/login").post(controller.verifyUser, controller.login); //use to login a user in our app

// GET Methods
router.route("/user/:username").get(controller.getUser); //use to get the user details
router
  .route("/generateOtp")
  .get(
    controller.verifyUser,
    middleware.localVariables,
    controller.generateOtp
  ); //use to generate random otp
router.route("/verifyOtp").get(controller.verifyUser, controller.verifyOtp); //use to verify the otp
router.route("/createResetSession").get(controller.createResetSession); //use to reset all the variables

// PUT Methods
router.route("/updateUser").put(middleware.auth, controller.updateUser); //use to update the user details
router
  .route("/resetPassword")
  .put(controller.verifyUser, controller.resetPassword); //use to reset the password of a user

export default router;
