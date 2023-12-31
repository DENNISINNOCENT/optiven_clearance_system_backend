const jwt = require("jsonwebtoken");

//secret key to sign & verify tokens
const secretKey = "12345678";

// jwt token
const generateToken = (user) => {
  const payload = {
    userId: user.user_id,
    userRole: user.user_role,
  };
  // token expiration
  const options = {
    expiresIn: "1h",
  }
  return jwt.sign(payload, secretKey, options);
};

const verifyToken = (token) => {
  console.log('Received Token:', token);
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error('Token Verification Error:', error.message);
    throw new Error('Invalid token');
  }
}
module.exports = {
  generateToken,
  verifyToken,
};
