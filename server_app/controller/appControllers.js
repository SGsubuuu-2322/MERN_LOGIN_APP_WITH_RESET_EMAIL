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

const credentialsChecking = async ({ username, email }) => {
  if (username) {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      throw new Error("Username already exists. Try with a new one...");
    }
  }

  if (email) {
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      throw new Error("Email already exists. Try with a new one...");
    }
  }
};

export async function register(req, res) {
  try {
    const { username, email, password, profile } = req.body;

    // Input validation to ensure that required fields are present
    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    await credentialsChecking({ username, email });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
      profile: profile || "",
    });

    await user.save();
    return res.status(201).json({
      message: "User registered successfully",
      user_id: user._id,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
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
