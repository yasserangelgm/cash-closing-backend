const express = require("express");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//Importación de rutas
const transactionsRouter = require("./routes/transactions");
const usersRouter = require("./routes/users");
const reportsRouter = require("./routes/reports");

// Middleware para manejar JSON
app.use(express.json());
app.use("/transactions", transactionsRouter);
app.use("/users", usersRouter);
app.use("/reports", reportsRouter);

app.get("/", (req, res) => {
  res.send("Bienvenido a la API CashOut");
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
