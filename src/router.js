const express = require("express");
const { pool } = require("./connection")
const { transaction, getTransactionById, createTransaction, updateTransaction, getBankStatement, deleteTransaction } = require("./controllers/transaction");
const { createUser, loginUser, listUser, updateUser } = require("./controllers/user");
const { listCategories } = require("./controllers/categories");
const { authenticate } = require("./middleware/authenticate");


const router = express();

// Rotas abertas
router.post("/usuario", createUser)
router.post("/login", loginUser)

router.use(authenticate);

// Rotas protegidas
router.get("/usuario", listUser)
router.put("/usuario", updateUser)

router.get("/categoria", listCategories)

router.get("/transacao", transaction)
router.get("/transacao/extrato", getBankStatement)
router.get("/transacao/:id", getTransactionById)
router.post("/transacao", createTransaction)

router.put("/transacao/:id", updateTransaction)

router.delete("/transacao/:id", deleteTransaction)




module.exports = router;