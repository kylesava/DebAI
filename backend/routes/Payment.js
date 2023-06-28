const { getBalance } = require("../controller/PaymentController");

const router = require("express").Router()

router.get("/balance",getBalance)

module.exports = router;