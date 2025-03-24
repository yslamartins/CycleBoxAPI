const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Você acessou uma rota protegida!" });
});

router.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Bem-vindo, administrador!" });
});

module.exports = router;
