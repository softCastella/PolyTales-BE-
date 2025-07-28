const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.post("/users", userController.createUser);
router.get("/users", userController.findAll);
router.get("/users/:id", userController.findOne);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;