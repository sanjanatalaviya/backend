const express = require('express');
const { paymentController } = require('../../../controller');

const router = express.Router();

router.get('/get-payment/:_id',
    paymentController.getPayment
);

router.get('/list-payment',
    paymentController.listPayment
);

router.post('/add-payment',
    paymentController.addPayment
);

router.put('/update-payment/:_id',
    paymentController.updatePayment
);

router.delete('/delete-payment/:_id',
    paymentController.deletePayment
);

router.get("/order/:order_id",
    paymentController.Paymentdetailsorder
);

module.exports = router;