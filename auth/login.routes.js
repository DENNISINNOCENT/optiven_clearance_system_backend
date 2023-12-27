const express = require("express");
const router = express.Router();
const jwt = require("./authJwt");
const authenticateToken = require("../middleware/authenticateJwt");
const md5 = require("md5");

module.exports = (Pool) => {
  router.post("/", async (req, res) => {
    const { user_email, user_password } = req.body;
    const hashedPassword = md5(user_password);

    try {
      const [rows] = await Pool.promise().query(
        "SELECT * FROM users WHERE user_email = ?",
        [user_email, hashedPassword]
      );

      if (!rows || rows.length === 0) {
        res.status(401).json({
          message: "User not found",
        });
        return;
      }

      const user = rows[0];

      const token = jwt.generateToken(user);
      res.json({ token });
    } catch (error) {
      console.error("Error during login", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  });

  router.get("/protected", authenticateToken, (req, res) => {
    // Access user information from the request object
    const { userId, userRole } = req.user;

    res.json({
      userId,
      userRole,
      message: "Access granted to protected route",
    });
  });

  return router;
};