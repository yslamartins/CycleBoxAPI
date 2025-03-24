const express = require("express");
const ProductController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/products", ProductController.findAll);
router.get("/products/:id", ProductController.findById);

router.post("/products", [authMiddleware, adminMiddleware], ProductController.create);
router.put("/products/:id", [authMiddleware, adminMiddleware], ProductController.update);
router.delete("/products/:id", [authMiddleware, adminMiddleware], ProductController.delete);

module.exports = router;
