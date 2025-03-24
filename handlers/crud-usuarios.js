require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post("/users", async (req, res) => { 
  try {
    const { name, email, password } = req.body;

    const user = await prisma.user.create({
      data: { name, email, password },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar usuário." });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});

// GET UM USER
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });

    if (!user) return res.status(404).json({ error: "Usuário não encontrado." });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário." });
  }
});

// ATUALIZA USER POR ID (MELHOR UM PATCH?)
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, password: hashedPassword },
    });

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar usuário." });
  }
});

// DELETA O USER 
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário." });
  }
});


app.listen(port, () => {
  console.log(`O servidor está rodando em http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Prisma desconectado');
  process.exit(0);
});
