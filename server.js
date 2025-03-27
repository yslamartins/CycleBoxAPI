const express = require("express");
const cors = require("cors"); 
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());
app.use(cors()); 

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando http://localhost:${PORT}`);
});


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CycleBox API",
      version: "1.0.0",
      description: "Documentação da API do brechó CycleBox",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, // 
        description: "Servidor Local",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/users", userRoutes);
app.use(productRoutes);

app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});