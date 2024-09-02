const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transactions");

router.get("/", TransactionController.getAll);
router.post("/", TransactionController.create);
router.get("/recent", TransactionController.getRecent);
router.delete("/:id", TransactionController.eliminate);
router.put("/:id", TransactionController.update);

module.exports = router;
