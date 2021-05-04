const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  //   console.log("authHeader", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  //   console.log("token", token);
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("decoded", decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

module.exports = {
  verifyToken,
};
