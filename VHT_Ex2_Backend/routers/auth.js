const authController = require("../controllers/authControllers");
const middlewareController = require("../controllers/middlewareControllers");

const router = require("express").Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/refresh", authController.reqRefreshToken);

router.post(
  "/update",
  middlewareController.verifyToken,
  authController.updateUser
);

router.post(
  "/logout",
  middlewareController.verifyToken,
  authController.logoutUser
);

router.post("/checkpass", authController.checkPassword);

module.exports = router;
