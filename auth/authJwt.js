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
  };
  return jwt.sign(payload, secretKey, options);
};

const verifyToken =async (token) => {
  try {
    const decoded = await jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    if(err.name ==='TokenExpiredError'){
        throw new Error('Token expired')
    }
    throw new Error("Invalid token");
  }
};
module.exports = {
  generateToken,
  verifyToken,
};
