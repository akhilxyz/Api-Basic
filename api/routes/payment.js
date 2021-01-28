const router = require('express').Router()
const paymentHandler = require('../handlers/payment')


router.put('/', paymentHandler.addPayment)

// router.post('/', paymentHandler.updatePayment)

// router.post("/", paymentHandler.getPayment);

// router.delete("/:id", paymentHandler.deletePayment);

module.exports = router