const jwt = require("jsonwebtoken");

// Function to generate JWT token
function generateToken(userData) {
  return jwt.sign(userData, process.env.JWT_SECRET);
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

    // Attach the user object to the request for further processing
    req.user = decodedToken;

    // If the user is authenticated, proceed with the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}

module.exports = {
  authorize,
  generateToken,
};
