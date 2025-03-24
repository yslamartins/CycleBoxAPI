const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar usuário", error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
});

router.get("/profile", authMiddleware, async (req, res) => {
  const user = await UserModel.findById(req.user.userId);
  res.json(user);
});

module.exports = router;
