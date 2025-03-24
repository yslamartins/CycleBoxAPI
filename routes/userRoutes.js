const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

// Rotas públicas
router.post('/register', UserController.create); // Registro de novos usuários
router.post('/login', UserController.login); // Login de usuários

// Rotas protegidas (apenas admins)
router.post("/users", [authMiddleware, adminMiddleware], UserController.create); // Criar usuário (somente admins)
router.put("/users/:id", [authMiddleware, adminMiddleware], UserController.update); // Atualizar usuário (somente admins)
router.delete("/users/:id", [authMiddleware, adminMiddleware], UserController.delete); // Deletar usuário (somente admins)

// Rota pública para listar todos os usuários
router.get("/users", UserController.findAll);

// Rota pública para buscar um usuário específico
router.get("/users/:id", UserController.findById);

module.exports = router;