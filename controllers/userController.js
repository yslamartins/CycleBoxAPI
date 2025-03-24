const bcryptjs = require('bcryptjs');
const prisma = require('../config/database');

const UserController = {
  // Cria um novo usuário
  create: async (req, res) => {
    const { name, email, password } = req.body;

    // Verifica se todos os campos obrigatórios foram fornecidos
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
      // Verifica se o email já está cadastrado
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return res.status(400).json({ error: "E-mail já cadastrado!" });
      }

      // Hash da senha antes de salvar no banco de dados
      const hashedPassword = await bcryptjs.hash(password, 10);

      // Cria o usuário no banco de dados
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

    if (!email || !password) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }

    try {
      // Verifica se o usuário existe
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ error: "E-mail ou senha inválidos." });
      }

      // Compara a senha fornecida com a senha armazenada
      const passwordMatch = await bcryptjs.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "E-mail ou senha inválidos." });
      }

      // Gera um token JWT
      const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(200).json({ message: "Login realizado com sucesso!", token });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return res.status(500).json({ error: "Erro ao fazer login." });
    }
  },

  // Busca todos os usuários
  findAll: async (_, res) => {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return res.status(500).json({ error: "Erro ao buscar usuários." });
    }
  },

  // Busca um usuário pelo ID
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

  // Atualiza um usuário pelo ID
  update: async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
      // Verifica se o usuário existe
      const userExists = await prisma.user.findUnique({
        where: { id: parseInt(id) }
      });

      if (!userExists) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      // Hash da nova senha, caso seja fornecida
      const hashedPassword = password ? await bcryptjs.hash(password, 10) : undefined;

      // Atualiza o usuário no banco de dados
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

  // Deleta um usuário pelo ID
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      // Verifica se o usuário existe
      const userExists = await prisma.user.findUnique({
        where: { id: parseInt(id) }
      });

      if (!userExists) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      // Deleta o usuário do banco de dados
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