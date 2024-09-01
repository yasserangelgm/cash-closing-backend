const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Todas las transacciones");
});

module.exports = router;
