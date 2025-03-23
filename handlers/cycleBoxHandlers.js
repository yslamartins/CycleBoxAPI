const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();

const MOCK_API_URL = "https://679027cc49875e5a1a947d3c.mockapi.io/produtos"


async function createProduct(req, res) {
    try {
        const { name, price, category, enabled, condition, image } = req.body;
        
        const requiredFields = {
            name: "Nome é obrigatório",
            price: "Preço é obrigatório",
            category: "Categoria é obrigatória",
            image: "Imagem é obrigatória",
            condition: "Condição é obrigatória"
        };

        const missingFields = Object.entries(requiredFields)
            .reduce((acc, [field, message]) => 
                !req.body[field] ? { ...acc, [field]: message } : acc, 
            {});

        if (Object.keys(missingFields).length) {
            return res.status(400).json({ 
                error: "Campos obrigatórios faltando", 
                requiredFields: missingFields 
            });
        }

        // Validação do tipo do preço
        if (isNaN(parseFloat(price))) {
            return res.status(400).json({ error: "Preço deve ser um número válido" });
        }

        // Verificar se já existe um produto com o mesmo nome
        const existingProduct = await prisma.product.findFirst({
            where: {
                name: name
            }
        });

        if (existingProduct) {
            return res.status(400).json({ error: "Já existe um produto com este nome" });
        }

        // Primeiro salva no banco local
        const newProduct = await prisma.product.create({
            data: {
                name,
                price: parseFloat(price),
                enabled: enabled === 'true',
                condition,
                image
            }
        });

        // Depois envia para o MockAPI (aqui mantemos o category)
        await axios.post(MOCK_API_URL, {
            name,
            price: parseFloat(price),
            category,
            enabled: enabled === 'true',
            condition,
            image
        });

        res.status(201).json({ ...newProduct, category });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar produto: " + error.message });
    }
}

async function getAllProducts(_, res) {
    try {
        // Busca do MockAPI
        const response = await axios.get(MOCK_API_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar produtos: " + error.message });
    }
}

async function getProductById(req, res) {
    try {
        const { id } = req.params;
        // Busca do MockAPI
        const response = await axios.get(`${MOCK_API_URL}/${id}`);
        
        if (!response.data) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }
        
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar produto: " + error.message });
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;  
        const { name, price, category, enabled, condition, image } = req.body;
        
        // Primeiro atualiza no banco local
        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                name,
                price: parseFloat(price),
                enabled: enabled === 'true',
                category,
                condition,
                image
            }
        });

        // Depois atualiza no MockAPI
        await axios.put(`${MOCK_API_URL}/${id}`, {
            name,
            price: parseFloat(price),
            category,
            enabled: enabled === 'true',
            condition,
            image
        });
        
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar produto: " + error.message });
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        
        // Verificar se o produto existe antes de deletar
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) }
        });

        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado no banco de dados" });
        }

        // Primeiro deleta do banco local
        await prisma.product.delete({
            where: { id: parseInt(id) }
        });

        // Depois deleta do MockAPI
        await axios.delete(`${MOCK_API_URL}/${id}`);
        
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar produto: " + error.message });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}; 