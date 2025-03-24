const express = require("express");
const prisma = require("../config/database");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Listar produtos
router.get("/products", authMiddleware, async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos", error });
  }
});

module.exports = router;
