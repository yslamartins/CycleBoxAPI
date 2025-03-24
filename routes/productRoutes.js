const express = require('express');
const ProductController = require('../controllers/productController');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');


router.post("/products", ProductController.create);
router.get("/products", ProductController.findAll);

router.post("/products", [authMiddleware, adminMiddleware], ProductController.create);
router.put("/products/:id", [authMiddleware, adminMiddleware], ProductController.update);
router.delete("/products/:id", [authMiddleware, adminMiddleware], ProductController.delete);

module.exports = router;