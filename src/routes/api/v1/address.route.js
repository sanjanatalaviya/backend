const express = require('express');
const { AddressController } = require('../../../controller');

const router = express.Router();

router.get('/get-address/:_id',
    AddressController.getAddress
);

router.get('/list-address',
    AddressController.listAddress,
);

router.post('/add-address',
    AddressController.addAddress,
);

router.put('/update-address/:_id',
    AddressController.updateAddress
);

router.delete('/delete-address/:_id',
    AddressController.deleteAddress
);

module.exports = router;