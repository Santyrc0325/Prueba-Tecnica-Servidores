const express = require("express");
const db = require("../db");

const router = express.Router();

// Agregar un nuevo servidor
router.post("/", (req, res) => {
  const { name, os, ram, disk_capacity, ip_address, status } = req.body;

  db.query(
    "INSERT INTO servers (name, os, ram, disk_capacity, ip_address, status) VALUES (?, ?, ?, ?, ?, ?)",
    [name, os, ram, disk_capacity, ip_address, status],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Servidor agregado correctamente" });
    }
  );
});

// Listar todos los servidores
router.get("/", (req, res) => {
  db.query("SELECT * FROM servers", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Obtener un servidor por ID
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM servers WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: "Servidor no encontrado" });
    res.json(result[0]);
  });
});

// Actualizar un servidor
router.put("/:id", (req, res) => {
  const { name, os, ram, disk_capacity, ip_address, status } = req.body;

  db.query(
    "UPDATE servers SET name=?, os=?, ram=?, disk_capacity=?, ip_address=?, status=? WHERE id=?",
    [name, os, ram, disk_capacity, ip_address, status, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Servidor actualizado correctamente" });
    }
  );
});

// Eliminar un servidor
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM servers WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Servidor eliminado correctamente" });
  });
});

// Cambiar estado de un servidor
router.patch("/:id/status", (req, res) => {
  const { status } = req.body;
  db.query("UPDATE servers SET status=? WHERE id=?", [status, req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Estado del servidor actualizado correctamente" });
  });
});

module.exports = router;
