const middlewareController = require("../controllers/middlewareControllers");
const userController = require("../controllers/userControllers");

const router = require("express").Router();

router.get('/', middlewareController.verifyToken, userController.getUsers);

router.delete('/:id', middlewareController.verifyAdmin, userController.deleteUser);

module.exports = router;