module.exports = (req, res, next) => {
  const { isAdmin } = req.user; // Supondo que o campo `isAdmin` exista no modelo de usuário
  if (!isAdmin) {
    return res.status(403).json({ error: "Acesso negado. Permissão de administrador necessária." });
  }
  next();
};