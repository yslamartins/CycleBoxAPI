const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Acesso negado. Apenas administradores podem realizar esta ação." });
  }
  next();
};

module.exports = adminMiddleware;
