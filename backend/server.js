const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

//Autenticación
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

//CRUD de servidores
const serverRoutes = require("./routes/servers");
app.use("/api/servers", serverRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
