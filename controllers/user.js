const User = require("../models/user");

async function create(req, res) {
  const { username, password, role } = req.body;

  try {
    const newUser = await User.createUser(username, password, role);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
}

module.exports = { create };
