const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.getUserByName(username);
    console.log("USER", user);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectas" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET, // Usa una variable de entorno para la clave secreta
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
      maxAge: 3600000, // 1 hora
    });
    return res.json({ message: "Login exitoso" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el sevidor", error });
  }
}

module.exports = { login };
