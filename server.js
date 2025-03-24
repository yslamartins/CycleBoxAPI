const express = require('express');
const cors = require('cors');
const prisma = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors()); 
app.use(express.json()); 

app.use(userRoutes);
app.use(productRoutes);

app.get('/', (_, res) => {
  res.send('Servidor está funcionando!');
});

app.listen(port, () => {
  console.log(`O servidor está rodando em http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Prisma desconectado');
  process.exit(0);
});
