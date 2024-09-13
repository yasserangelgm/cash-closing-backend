const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  /* const token =
      req.cookies.token || req.headers["Authorization"]?.split(" ")[1]; */
  /* const token = req.header("Authorization"); */
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    res.status(401).json({ message: "Acceso denegado" });
  }
  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Token inválido." });
  }
}

module.exports = { verifyToken };
