import jwt from "jsonwebtoken";
import ENV from "../config.js";

export async function auth(req, res, next) {
  try {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];

      if (token) {
        const user = await jwt.verify(token, ENV.JWT_SECRET);
        req.user = user;
        next();
      } else {
        return res
          .status(404)
          .send({ message: "Token not found! Authorization denied..." });
      }
    } else {
      return res
        .status(404)
        .send({ message: "Token not found! Authorization denied..." });
    }
  } catch (error) {
    return res.status(404).send({ message: "Authentication failed!!!" });
  }
}

export async function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
