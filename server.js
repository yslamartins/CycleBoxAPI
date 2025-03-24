const express = require("express");
const cors = require("cors"); 
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());
app.use(cors()); 
app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.listen(4000, () => {
  console.log("Servidor rodando na porta 4000");
});
