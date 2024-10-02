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
  res.status(200).json("register route");
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
