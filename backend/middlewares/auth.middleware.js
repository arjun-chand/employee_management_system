const jwt = require("jsonwebtoken");
const User = require('../db/models/User.model'); // Adjust the path to your User model

// Function to generate JWT token
function generateToken(userData) {
  return jwt.sign(userData, process.env.JWT_SECRET,{ expiresIn: '1h' });
}

// Middleware to authorize requests
async function authorize(req, res, next) {
  try {
    // Check if token is present in headers or cookies
    let token = req.headers.authorization?.split(" ")[1];
    if (!token && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database using the decoded token's user ID
    const user = await User.findByPk(decodedToken.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach the user object to the request for further processing
    req.user = user;

    // If the user is authenticated, proceed with the next middleware
    next();
  } catch (error) {
    console.error('Authorization error:', error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}

module.exports = {
  authorize,
  generateToken,
};
