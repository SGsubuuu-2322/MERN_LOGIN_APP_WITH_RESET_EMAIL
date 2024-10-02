import { Router } from "express";

const router = Router();

// POST Methods
router
  .route("/register")
  .post((req, res) => res.status(200).json("register route")); //use to register a user...

router.route("/registerMail").post(); //use to send the mail
router.route("/authenticate").post(); //use to authenticate a user
router.route("/login").post(); //use to login a user in our app

// GET Methods
router.route("/user/:username").get(); //use to get the user details
router.route("/generateOtp").get(); //use to generate random otp
router.route("/verifyOtp").get(); //use to verify the otp
router.route("/createResetSession").get(); //use to reset all the variables

// PUT Methods
router.route("/updateUser").put(); //use to update the user details
router.route("/resetPassword").put(); //use to reset the password of a user

export default router;
