const jwt = require("jsonwebtoken");
const prisma = require("../config/database");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) return res.status(401).json({ message: "Usuário não encontrado" });

    req.user = user; // Adiciona o objeto `user` completo à requisição
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
};