const Transaction = require("../models/transactions");

async function create(req, res) {
  const {
    user_id,
    amount,
    type,
    category,
    description,
    transaction_date,
    receipt_url,
  } = req.body;

  try {
    const newTransaction = await Transaction.createTransaction(
      user_id,
      amount,
      type,
      category,
      description,
      transaction_date,
      receipt_url
    );

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error al crear la transacción:", error);
    res.status(500).json({ error: "Error al crear la transacción" });
  }
}

async function getAll(req, res) {
  try {
    const transactions = await Transaction.getAllTransactions();

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error al obtener las transacciones:", error);
    res.status(500).json({ error: "Error al obtener las transacciones" });
  }
}

async function getRecent(req, res) {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const transactions = await Transaction.getRecentTransactions(limit);
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error al obtener las transacciones:", error);
    res.status(500).json({ error: "Error al obtener las transacciones" });
  }
}

// Eliminar una transaccion por id
async function eliminate(req, res) {
  const { id } = req.params;
  try {
    const deletedTransaction = await Transaction.deleteTransactionById(id);
    res.status(200).json({
      transaction: deletedTransaction,
      message: "Transacción eliminada con éxito",
    });
  } catch (error) {
    console.error("Error al eliminar la transacción:", error);
    res.status(500).json({ error: "Error al eliminar la transacción" });
  }
}

// Editar una transacción
async function update(req, res) {
  const { id } = req.params;
  const transactionData = req.body;
  try {
    const updatedTransaction = await Transaction.updateTransactionById(
      id,
      transactionData
    );
    res.status(200).json({
      transaction: updatedTransaction,
      message: "Transacción actualizada con éxito",
    });
  } catch (error) {
    console.error("Error al actualizar la transacción:", error);
    res.status(500).json({ error: "Error al actualizar la transacción" });
  }
}
module.exports = {
  create,
  getAll,
  getRecent,
  eliminate,
  update,
};
