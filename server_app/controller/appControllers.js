import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/

export async function register(req, res) {
  try {
    const { username, email, password, profile } = req.body;

    // Checking for the username
    const existingUser = new Promise((resolve, reject) => {
      UserModel.findOne({ username }, (err, user) => {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Please use unique username..." });

        resolve();
      });
    });

    // Checking for the email
    const existingEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, (err, email) => {
        if (err) reject(new Error(err));
        if (email) reject({ error: "Please use unique email..." });

        resolve();
      });
    });

    Promise.all([existingUser, existingEmail])
      .then(() => {
        bcrypt
          .hash(password, 10)
          .then((hashedPassword) => {
            const user = new UserModel({
              username,
              email,
              password: hashedPassword,
              profile: profile || "",
            });
            user
              .save()
              .then((result) => {
                return res
                  .status(200)
                  .send({ message: "User register successfully..." });
              })
              .catch((err) => {
                return res.status(500).send({ err });
              });
          })
          .catch((error) => {
            return res
              .status(500)
              .send({ error: "Enable to hashed password..." });
          });
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
}

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) {
  res.status(200).json("login route");
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
  res.status(200).json("getUser route");
}

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
  res.status(200).json("update user route");
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOtp(req, res) {
  res.status(200).json("update user route");
}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOtp(req, res) {
  res.status(200).json("update user route");
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
  res.status(200).json("update user route");
}

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
  res.status(200).json("update user route");
}
