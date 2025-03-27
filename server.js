const express = require("express");
const cors = require("cors"); 
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 4000;
const serverURL =
  process.env.NODE_ENV === "production"
    ? "https://cycle-box-api.vercel.app/" 
    : `http://localhost:${PORT}`;

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
        url: serverURL,
        description: process.env.NODE_ENV === "production" ? "Servidor de Produção" : "Servidor Local",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API está funcionando na Vercel!" });
});

app.use((err, req, res, next) => {
  console.error("Erro:", err.stack);
  res.status(500).json({
    error: "Erro interno do servidor",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

module.exports = app;
