const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testDbConnection() {
  try {
    await prisma.$connect();
    console.log("Conectado ao banco de dados com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
}

testDbConnection();

module.exports = prisma;