const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json("Please login to access this resource");
    }

    // Extract the token from the 'Authorization' header
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json("Please login to access this resource");
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedData.id);

    if (!user) {
      return res.status(401).json("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server error");
  }
};
