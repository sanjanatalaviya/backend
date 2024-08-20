const express = require('express');
const { salespeopleController } = require('../../../controller');

const router = express.Router();

router.get(
    '/list-salespeople',
    salespeopleController.listSales
);

router.post(
    '/add-salesperson',
    salespeopleController.insertSales
);

router.delete(
    '/delete-salesperson/:snum',
    salespeopleController.deleteSales
);

router.put(
    '/update-salesperson/:snum',
    salespeopleController.updateSales
)

module.exports = router;