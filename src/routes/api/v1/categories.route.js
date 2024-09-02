const express = require('express');
const { categoriesController } = require('../../../controller');
const auth = require('../../../middleware/auth');
const validation = require('../../../middleware/validation.js');
const { categoryValidation } = require('../../../validation.js/index.js');

const router = express.Router();

router.get('/get-categories/:category_id',
    //  /:category_id
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

router.get('/get-inActive',
    categoriesController.inActive
);

router.get('/get-active',
    categoriesController.active
);

router.get('/get-highpro',
    categoriesController.highproduct
);

router.get('/get-avgpro',
    categoriesController.averagenproduct
);

router.get('/get-countcat',
    categoriesController.countsubcategories
);

router.get('/get-subtocat/:category_id',
    categoriesController.subcategorioncategori
);

module.exports = router;