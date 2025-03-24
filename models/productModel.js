const prisma = require('../config/database');

const ProductModel = {
  create: (data) => prisma.product.create({ data }),
  findAll: () => prisma.product.findMany(),
  findById: (id) => prisma.product.findUnique({ where: { id: parseInt(id) } }),
  update: (id, data) => prisma.product.update({ where: { id: parseInt(id) }, data }),
  delete: (id) => prisma.product.delete({ where: { id: parseInt(id) } })
};

module.exports = ProductModel;