import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import otpGenerator from "otp-generator";
import userModel from "../models/user.model.js";

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
        userId: existingUser._id,
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
  try {
    const { username } = req.params;

    if (!username)
      return res.status(501).send({ error: "Invalid Username!!!" });

    const user = await UserModel.findOne({ username });
    if (!user) return res.status(404).send({ message: "User not found!!!" });

    const { password, ...rest } = Object.assign({}, user.toJSON());

    return res.status(201).send({ rest });
  } catch (error) {
    return res.status(404).send({
      error: error.message,
    });
  }
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
  try {
    const { userId } = req.user;

    if (userId) {
      const body = req.body;

      await UserModel.updateOne({ _id: userId }, body);

      return res.status(201).send({
        message: "User profile updation successfull...",
      });
    }
  } catch (error) {
    return res.status(401).send({
      error: error.message,
    });
  }
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOtp(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  return res.status(201).send({ code: req.app.locals.OTP });
}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOtp(req, res) {
  const { code } = req.body;

  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    return res.status(200).send({ message: "OTP verified successfully..." });
  }

  return res.status(400).send({ error: "Invalid OTP!!!" });
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    return res.status(201).send({ message: "Access Granted!!!" });
  }

  return res.status(440).send({ error: "Session expired!!!" });
}

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
  try {
    const { username, password } = req.body;

    // Input validation to ensure that required fields are present
    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "User not found!!!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (hashedPassword) {
      await userModel.updateOne(
        { username: user.username },
        { password: hashedPassword }
      );

      return res
        .status(201)
        .send({ message: "Password updation successfully!!!" });
    } else {
      return res
        .status(401)
        .send({ error: "Unable to hashed the password!!!" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}
