/** authenticate function */
import axios from "axios";

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

    let { username, mail } = credentials;

    // send mail

    if (status === 201) {
      await axios.post("api/registerMail", {
        username,
        userEmail: mail,
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
      header: { Auhtorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't update the profile..." });
  }
}
