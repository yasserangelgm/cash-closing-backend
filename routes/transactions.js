const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transactions");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", TransactionController.getAll);
router.post("/", authMiddleware.verifyToken, TransactionController.create);
router.get("/recent", TransactionController.getRecent);
router.get("/filter", TransactionController.filterByDates);
router.get("/:id", TransactionController.getById);
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  TransactionController.eliminate
);
router.put("/:id", authMiddleware.verifyToken, TransactionController.update);

module.exports = router;
