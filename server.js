require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require("./handlers/authMiddleware");
const authRoutes = require("./handlers/authHandlers");
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('./handlers/cycleBoxHandlers');

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(authRoutes);

//implementação de rota protegida
app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Você acessou uma rota protegida!", userId: req.userId });
});

async function testDbConnection() {
  try {
    await prisma.$connect();
    console.log("Conectado ao banco de dados com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }

}

testDbConnection();

// Rotas da API
app.post('/products', createProduct);
app.get('/products', getAllProducts);
app.get('/products/:id', getProductById);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);

app.get('/', (_, res) => {
  res.send('Servidor está funcionando!');
});

app.listen(port, () => {
  console.log(`O servidor está rodando em http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Prisma desconectado');
  process.exit(0);
});
