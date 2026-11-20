const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }
    const token = authorization.slice(7).trim();
    if (!token || token.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Invalid token format" });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ success: false, message: "JWT secret is not configured" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admin access only" });
    }
    // Never log raw bearer tokens or password hashes.
    req.user = decoded;
    next();
  } catch (error) {
    if (["JsonWebTokenError", "TokenExpiredError", "NotBeforeError"].includes(error.name)) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
    console.error("Authentication error:", error);
    return res.status(500).json({ success: false, message: "Authentication failed" });
  }
};

module.exports = adminAuth;
