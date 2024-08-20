const express = require('express');
const { subcategoriesController } = require('../../../controller');

const router = express.Router();

router.get('/get-subcategories/:subcategory_id',
    subcategoriesController.getSubcategory
);

router.get('/list-subcategories',
    subcategoriesController.listSubcategory
);

router.post('/add-subcategory',
    subcategoriesController.addSubcategory
);

router.put('/update-subcategory/:subcategory_id',
    subcategoriesController.updateSubcategory
);

router.delete('/delete-subcategory/:subcategory_id',
    subcategoriesController.deleteSubcategory
    // (req, res) => {
    //     console.log("subcategories delete api.");
    //     res.send("subcategories delete api.");
    // }
);

router.get('/getsubByCategory/:category_id',
    subcategoriesController.getsubByCategory
);

module.exports = router;