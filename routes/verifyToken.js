const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
       if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      console.log(req.user =user)
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  } 
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res,() => {
     
    // req.user.id is the id from login 
    // req.params.userId is the id we are sending in params of api
    if (req.user.id === req.params.userId || req.user.isAdmin){
      console.log(req.user.id)
      console.log(req.params.userId)
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};


const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};