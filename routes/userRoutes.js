const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas
router.post('/register', UserController.create);
router.post('/login', UserController.login);

// Rotas protegidas
router.get('/:id', authMiddleware, UserController.findById);
router.put('/:id', authMiddleware, UserController.update);
router.delete('/:id', authMiddleware, UserController.delete);

module.exports = router;