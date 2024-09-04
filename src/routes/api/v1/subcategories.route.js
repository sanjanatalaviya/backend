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

router.get('/get-subactive',
    subcategoriesController.Active
);

router.get('/get-highest',
    subcategoriesController.highest
);

router.get('/parent-of-subcategory/:category_id',
    subcategoriesController.parentOfSubcategory
);

router.get('/get-subInactive',
    subcategoriesController.Inactive
);

router.get('/get-countcat',
    subcategoriesController.countsubcategories
);

module.exports = router;