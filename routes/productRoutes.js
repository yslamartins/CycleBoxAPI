const express = require("express");
const ProductController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Tênis Nike"
 *         preco:
 *           type: number
 *           example: 199.99
 *         habilitado:
 *           type: boolean
 *           example: true
 *         imagem:
 *           type: string
 *           example: "https://example.com/image.jpg"
 *         categoria:
 *           type: string
 *           enum: [MASCULINO, FEMININO, ACESSORIOS]
 *           example: "MASCULINO"
 *         condicao:
 *           type: string
 *           enum: [NOVO, USADO]
 *           example: "NOVO"
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Recupera todos os produtos
 *     tags:
 *       - Produtos
 *     responses:
 *       200:
 *         description: Uma lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */
router.get("/produtos", ProductController.findAll);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Recupera um produto específico pelo ID
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do produto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 */
router.get("/produtos/:id", ProductController.findById);

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto (Somente Admin)
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       403:
 *         description: Proibido
 */
router.post("/produtos", [authMiddleware, adminMiddleware], ProductController.create);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID (Somente Admin)
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       403:
 *         description: Proibido
 */
router.put("/produtos/:id", [authMiddleware, adminMiddleware], ProductController.update);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Deleta um produto pelo ID (Somente Admin)
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       403:
 *         description: Proibido
 */
router.delete("/produtos/:id", [authMiddleware, adminMiddleware], ProductController.delete);

module.exports = router;
