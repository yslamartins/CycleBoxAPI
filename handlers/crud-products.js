require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


// CREATE PRODUCT
app.post("/products", async (req, res) => {
  try {
    const { name, price, enabled, image } = req.body;

    // Verificação de campos obrigatórios
    const requiredFields = {
      name: "Nome é obrigatório",
      price: "Preço é obrigatório",
      image: "Imagem é obrigatória",
    };

    const missingFields = Object.entries(requiredFields)
    .reduce((acc, [field, message]) => 
      !req.body[field] || req.body[field].trim() === '' ? { ...acc, [field]: message } : acc, 
    {});

    if (Object.keys(missingFields).length) {
      return res.status(400).json({ 
        error: "Campos obrigatórios faltando", 
        requiredFields: missingFields 
      });
    }

    // Verificação do tipo do preço
    if (isNaN(parseFloat(price))) {
      return res.status(400).json({ error: "Preço deve ser um número válido" });
    }

    // Verificar se já existe um produto com o mesmo nome
    const existingProduct = await prisma.product.findUnique({
      where: {
        name: name
      }
    });

    if (existingProduct) {
      return res.status(400).json({ error: "Já existe um produto com este nome" });
    }

    // Criação do produto
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        enabled: enabled === 'true', // Verificando se o valor de enabled é 'true' ou não
        image
      }
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar produto: " + error.message });
  }
});

// GET TODOS PRODUCTS
app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
});

// GET UM PRODUCT
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });

    if (!product) return res.status(404).json({ error: "Produto não encontrado." });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto." });
  }
});

// ATUALIZA PRODUCT POR ID
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, enabled, image } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, price: parseFloat(price), enabled, image }
    });

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar produto." });
  }
});

// DELETA O PRODUCT
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Produto deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar produto." });
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
