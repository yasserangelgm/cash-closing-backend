const pool = require("../db");
const bcrypt = require("bcrypt");

async function createUser(username, password, role) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const query = `INSERT INTO users(username, password, role) 
                  VALUES($1, $2, $3) RETURNING *`;
  const values = [username, hashedPassword, role];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

async function getUserByName(userName) {
  const query = `SELECT * FROM users WHERE username = $1`;
  const values = [userName];
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = { getUserByName, createUser };
