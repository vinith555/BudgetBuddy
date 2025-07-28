const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;
// JWT Middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  // console.log("Auth Header:", authHeader);
  if (!authHeader) return res.status(403).send("Token missing");

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
       console.log("JWT ERROR:", err.message);
      return res.status(403).send("Invalid token")};
    req.user = user;
    next();
  });
}

module.exports = verifyToken;