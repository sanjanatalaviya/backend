const express = require('express');
const { orderController } = require('../../../controller');

const router = express.Router();

router.get('/get-order/:_id',
    orderController.getOrder
);

router.get('/list-order',
    orderController.listOrder
);

router.post('/add-order',
    orderController.addOrder
);

router.put('/update-order/:_id',
    orderController.updateOrder
);

router.delete('/delete-order/:_id',
    orderController.deleteOrder
);

module.exports = router;