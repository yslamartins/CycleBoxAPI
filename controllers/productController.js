const ProductModel = require('../models/productModel');

const ProductController = {
  create: async (req, res) => {
    try {
      const { name, price, enabled, image } = req.body;
      const product = await ProductModel.create({ name, price, enabled, image });
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: "Erro ao criar produto." });
    }
  },

  findAll: async (_, res) => {
    try {
      const products = await ProductModel.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar produtos." });
    }
  },

  findById: async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) return res.status(404).json({ error: "Produto não encontrado." });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar produto." });
    }
  },

  update: async (req, res) => {
    try {
      const {  name, price, enabled, image } = req.body;
      const product = await ProductModel.update(req.params.id, { name, price, enabled, image });
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: "Erro ao atualizar produto." });
    }
  },

  delete: async (req, res) => {
    try {
      await ProductModel.delete(req.params.id);
      res.json({ message: "Produto deletado com sucesso." });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar produto." });
    }
  }
};

module.exports = ProductController;