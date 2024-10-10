// importing all the packages for sending mail...
import nodemailer from "nodemailer";
import ENV from "../config.js";
import Mailgen from "mailgen";

// Creating the transporter for sending the mail from server end point...
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: ENV.MAIL_USER,
    pass: ENV.MAIL_PASS,
  },
});

// Configuring the mailgenerator for mail body template....
let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

// const mailOptions = await transporter.sendMail({
//   from: ENV.MAIL_USER, // sender address
//   to: ["pradhansubham147@gmail.com"], // list of receivers
//   subject: "Hello ✔", // Subject line
//   text: "Hello world?", // plain text body
//   html: "<b>Hello world?</b>", // html body
// });

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/

// controller function for sending the mail when called...
export default async function registerMail(req, res) {
  try {
    const { username, userEmail, text, subject } = req.body;
    // body of the email
    var email = {
      body: {
        name: username,
        intro:
          text ||
          "Welcome to MERN_Login_App Project! We're very excited to have you on board.",
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    var emailBody = MailGenerator.generate(email);

    let message = {
      from: ENV.MAIL_USER,
      to: userEmail,
      subject: subject || "Signup Successful",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return res
      .status(200)
      .send({ msg: "You should receive an email from us." });
  } catch (error) {
    return res.status(500).send({ error });
  }
}
