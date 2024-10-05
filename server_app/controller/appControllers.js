import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";

export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found!!!" });
    }
    next();
  } catch (error) {
    return res.status(404).json({ error: "Authentication error..." });
  }
}

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

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      throw new Error("Username already exists. Try with a new one...");
    }

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      throw new Error("Email already exists. Try with a new one...");
    }
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
  try {
    const { username, password } = req.body;

    // Input validation to ensure that required fields are present
    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }
    if (!password) {
      return res.status(400).json({ message: "Username is required." });
    }

    // Checking for the username in database...
    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({
        message:
          "Error in Credentials validation. Username doesn't exist. Try once again...",
      });
    }

    // Checking for the password validation...
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        message:
          "Error in Credentials validation. Wrong password. Try once again...",
      });
    }
    // Generating JWT token for the user...
    const token = jwt.sign(
      {
        user: existingUser._id,
        username: existingUser.username,
      },
      ENV.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful...",
      user: existingUser.username,
      token,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
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
