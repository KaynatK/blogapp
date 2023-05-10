const jwt = require("jsonwebtoken");
//the function will send request to check to token
//status will verify the detials 

module.exports = function(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" }); //checks for error
//user detials verify in the randomstring
//catch the any error
  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" }); //it will says invalid token
  }
};
//checks the security
//first take the token