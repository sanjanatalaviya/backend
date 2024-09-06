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

router.get("/seller/:seller_id",
    orderController.seller
);

router.get('/cancel',
    orderController.cancel
);

router.get('/user/:user_id',
    orderController.user
);

router.get('/product/:product_id',
    orderController.product
)

module.exports = router;