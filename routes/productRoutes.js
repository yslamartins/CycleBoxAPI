const express = require('express');
const ProductController = require('../controllers/productController');
const router = express.Router();

router.post("/products", ProductController.create);
router.get("/products", ProductController.findAll);
router.get("/products/:id", ProductController.findById);
router.put("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.delete);

module.exports = router;