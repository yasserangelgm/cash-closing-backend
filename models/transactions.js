const pool = require("../db");

// Insertar una transacción en la BD
async function createTransaction(
  userId,
  amount,
  type,
  category,
  description,
  transactionDate,
  receiptUrl
) {
  const query = `INSERT INTO transactions(user_id, amount, type, category, description, transaction_date, receipt_url) 
                  VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const values = [
    userId,
    amount,
    type,
    category,
    description,
    transactionDate,
    receiptUrl,
  ];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

// Obtener todas las transacciones
async function getAllTransactions() {
  try {
    const result = await pool.query("SELECT * FROM transactions;");
    return result.rows;
  } catch (error) {
    throw error;
  }
}
// Obtener cierto número de transacciones
async function getRecentTransactions(limit) {
  try {
    const result = await pool.query(
      `SELECT * FROM transactions ORDER BY transaction_date DESC LIMIT $1`,
      [limit]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
}

// Eliminar una transacción por ID
async function deleteTransactionById(id) {
  const query = "DELETE FROM transactions WHERE id = $1";
  try {
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

// Editar una transacción por ID
async function updateTransactionById(id, transactionData) {
  const {
    userId,
    amount,
    type,
    category,
    description,
    transactionDate,
    receiptUrl,
  } = transactionData;

  const query = `UPDATE transactions
                 SET user_id = $1, amount = $2, type = $3, category = $4, description = $5, transaction_date = $6, receipt_url = $7
                 WHERE id = $8`;
  try {
    const result = await pool.query(query, [
      userId,
      amount,
      type,
      category,
      description,
      transactionDate,
      receiptUrl,
      id,
    ]);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createTransaction,
  getAllTransactions,
  getRecentTransactions,
  deleteTransactionById,
  updateTransactionById,
};
