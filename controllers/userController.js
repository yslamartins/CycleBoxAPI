const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const UserController = {
  create: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserModel.create({ name, email, password: hashedPassword });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: "Erro ao criar usuário." });
    }
  },

  findAll: async (req, res) => {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuários." });
    }
  },

  findById: async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) return res.status(404).json({ error: "Usuário não encontrado." });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário." });
    }
  },

  update: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
      const user = await UserModel.update(req.params.id, { name, email, password: hashedPassword });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Erro ao atualizar usuário." });
    }
  },

  delete: async (req, res) => {
    try {
      await UserModel.delete(req.params.id);
      res.json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar usuário." });
    }
  }
};

module.exports = UserController;