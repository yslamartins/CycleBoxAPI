/*
module.exports = (req, res, next) => {
  // Implementação do middleware de autenticação
  next();
};

// routes/authRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const authHandlers = require('../handlers/authHandlers');
const router = express.Router();

router.use(authHandlers);

// Implementação de rota protegida
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Você acessou uma rota protegida!", userId: req.userId });
});

module.exports = router;
*/

