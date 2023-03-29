const express = require("express");
const { pool } = require("./connection")
const { transaction, getTransactionById, createTransaction, updateTransaction, getBankStatement, deleteTransaction } = require("./controllers/transaction");
const { createUser, loginUser, listUser, updateUser } = require("./controllers/user");
const { listCategories } = require("./controllers/categories");
const { authenticate } = require("./middleware/authenticate");
const validateBodyReq = require("./middleware/inputValidation");
const { createUserSchema, loginUserSchema } = require("./schemas/user");
const { createTransactionSchema } = require("./schemas/transaction");

const router = express();


router.post("/usuario", validateBodyReq(createUserSchema), createUser)
router.post("/login", validateBodyReq(loginUserSchema), loginUser)

router.use(authenticate);

router.get("/usuario", listUser)
router.put("/usuario", validateBodyReq(createUserSchema), updateUser)

router.get("/categoria", listCategories)

router.get("/transacao", transaction)
router.get("/transacao/extrato", getBankStatement)
router.get("/transacao/:id", getTransactionById)
router.post("/transacao", validateBodyReq(createTransactionSchema), createTransaction)

router.put("/transacao/:id", validateBodyReq(createTransactionSchema), updateTransaction)

router.delete("/transacao/:id", deleteTransaction)




module.exports = router;