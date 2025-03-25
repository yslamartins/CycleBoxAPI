const express = require("express");
const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/register", UserController.create);
router.post("/login", UserController.login);

router.post("/", authMiddleware, adminMiddleware, UserController.create);
router.put("/:id", authMiddleware, adminMiddleware, UserController.update);
router.delete("/:id", authMiddleware, adminMiddleware, UserController.delete);

router.get("/", authMiddleware, UserController.findAll);

router.get("/:id", authMiddleware, UserController.findById);

module.exports = router;
