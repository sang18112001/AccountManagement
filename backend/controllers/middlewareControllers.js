const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: (req, res, next) => {
    const requestToken = req.headers.token;
    if (requestToken) {
      const accessToken = requestToken.split(" ")[1];
      jwt.verify(accessToken, "token", (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid");
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      return res.status(401).json("You're not authenticated");
    }
  },
  verifyAdmin: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      // Check if the id of logged account is equal to the id of request or this account is the admin, next to deleting.
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        res.status(403).json("You're not allowed to delete this account")
      }
    });
  },
};

module.exports = middlewareController;
