const bcryptjs = require('bcryptjs');
const prisma = require('../config/database');

const UserController = {
  create: async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return res.status(400).json({ error: "E-mail já cadastrado!" });
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      });

      return res.status(201).json(user);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ error: "Erro ao criar usuário." });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }

      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.json({ token });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return res.status(500).json({ error: "Erro ao fazer login." });
    }
  },


  findAll: async (_, res) => {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return res.status(500).json({ error: "Erro ao buscar usuários." });
    }
  },

  findById: async (req, res) => {
    const { id } = req.params;
    
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) }
      });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return res.status(500).json({ error: "Erro ao buscar usuário." });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    
    try {
      const userExists = await prisma.user.findUnique({
        where: { id: parseInt(id) }
      });

      if (!userExists) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          name: name || userExists.name,
          email: email || userExists.email,
          password: hashedPassword || userExists.password
        }
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    
    try {
      const userExists = await prisma.user.findUnique({
        where: { id: parseInt(id) }
      });

      if (!userExists) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      await prisma.user.delete({
        where: { id: parseInt(id) }
      });

      return res.status(200).json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return res.status(500).json({ error: "Erro ao deletar usuário." });
    }
  }
};

module.exports = UserController;
