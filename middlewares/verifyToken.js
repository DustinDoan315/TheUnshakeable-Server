const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).send({ error: "Token is required" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ error: "Token expired" });
      }
      return res.status(403).send({ error: "Token invalid" });
    }

    req.user = user;
  });
};

module.exports = verifyToken;
