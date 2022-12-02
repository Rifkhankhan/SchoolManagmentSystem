const express = require('express');
var router = express.Router();
var PaymentController = require('../Controllers/Payment');

router.post('/createPayment', PaymentController.createPayment);
router.get('/getPayment/:id', PaymentController.getPayment);

module.exports = router;
