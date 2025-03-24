const prisma = require('../config/database');

const UserModel = {
  create: (data) => prisma.user.create({ data }),
  findAll: () => prisma.user.findMany(),
  findById: (id) => prisma.user.findUnique({ where: { id: parseInt(id) } }),
  findByEmail: (email) => prisma.user.findUnique({ where: { email } }),
  update: (id, data) => prisma.user.update({ where: { id: parseInt(id) }, data }),
  delete: (id) => prisma.user.delete({ where: { id: parseInt(id) } })
};

module.exports = UserModel;