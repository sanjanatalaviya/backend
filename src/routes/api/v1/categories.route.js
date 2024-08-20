const express = require('express');
const { categoriesController } = require('../../../controller');
const auth = require('../../../middleware/auth');
const validation = require('../../../middleware/validation');
const { categoryValidation } = require('../../../../validation.js');

const router = express.Router();

router.get('/get-categories',
    ///:category_id
    validation(categoryValidation.getCategory),
    categoriesController.getCategory
);

router.get('/list-categories',
    auth(["admin", "employee", "user"]),
    categoriesController.listCategory
);

router.post('/add-category',
    validation(categoryValidation.createCategory),
    categoriesController.addCategory
);

router.put('/update-category/:category_id',
    validation(categoryValidation.updateCategory),
    categoriesController.updateCategory
);

router.delete('/delete-category/:category_id',
    validation(categoryValidation.deleteCategory),
    categoriesController.deleteCategory
    // (req, res) => {
    //     console.log("categories delete api.");
    //     res.send('categories delete api.');
    // }
);

module.exports = router;