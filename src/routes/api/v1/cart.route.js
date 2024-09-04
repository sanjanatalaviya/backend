const express = require('express');
const { cartController } = require('../../../controller');

const router = express.Router();

router.get('/get-cart/:_id',
    cartController.getCart
);

router.get('/list-cart',
    cartController.listCart
);

router.post('/add-cart',
    cartController.addCart
);

router.put('/update-cart/:_id',
    cartController.updateCart
);

router.delete('/delete-cart/:_id/:product_id',
    cartController.deleteCart
);

module.exports = router;