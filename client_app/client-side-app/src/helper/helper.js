/** authenticate function */
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// axios.defaults.baseURL = import.meta.env.REACT_APP_SERVER_DOMAIN;
axios.defaults.baseURL = "http://localhost:8080";

// Make API Requests...

// To get username from token
export async function getUserName() {
  const token = await localStorage.getItem("token");
  if (!token) return Promise.reject("Cannot find token...");
  const decode = jwtDecode(token);
  // console.log(decode);
  return decode;
}

// Authenticate function for user authentication
export async function authenticate(username) {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "Username doesn't exists..." };
  }
}

// GetUser function for fetching the userdetails...
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't match..." };
  }
}

// RegisterUser function for registering a user into the database...
export async function registerUser(credentials) {
  try {
    const {
      data: { message },
      status,
    } = await axios.post("api/register", credentials);

    let { username, email } = credentials;

    // send mail

    if (status === 201) {
      await axios.post("api/registerMail", {
        username,
        userEmail: email,
        text: message,
      });
    }
    return Promise.resolve(message);
  } catch (error) {
    return Promise.reject({ error });
  }
}

// Login function for logging a user into the database...
export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post("/api/login", { username, password });
      return Promise.resolve(data);
    }
  } catch (error) {
    return Promise.reject({ error: "Credentials misamatched!!!" });
  }
}

// UpdateUser function for updating the user profile...
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("/api/updateUser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't update the profile..." });
  }
}

// GenerateOTP function for generating otp for password reset...
export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOtp", { params: { username } });
    if (status === 201) {
      let { data } = await getUser({ username });

      const email = data?.rest?.email;

      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;

      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "Password Recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject(error);
  }
}

// VerifyOTP function for verifying the OTP input by the user...
export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get("/api/verifyOtp", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

// ResetPassword function for reseting the handling the reset password network action...
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject(error);
  }
}
