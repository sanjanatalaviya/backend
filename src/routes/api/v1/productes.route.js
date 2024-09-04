const express = require('express');
const { productesController } = require('../../../controller');
const upload = require('../../../middleware/upload');

const router = express.Router();

router.get('/get-productes/:product_id',
    productesController.getProductes
);

router.get('/list-productes',
    productesController.listProductes
);

router.post('/add-productes',
    upload.single('image'),
    productesController.addProductes
);

router.put('/update-productes/:product_id',
    upload.single('image'),
    productesController.updateProductes
);

router.delete('/delete-productes/:product_id',
    productesController.deleteProductes
    // (req, res) => {
    //     console.log("productes delete api.");
    //     res.send("productes delete api.");
    // }
);

router.get('/getproBysub/:subcategory_id',
    productesController.getproBySub
)

router.get('/search-productes',
    productesController.searchProductes
);

router.get('/productesbycat/:category_id',
    productesController.productsByCategory
);

router.get('/probysub/:subcategory_id',
    productesController.productsBySubcategory
);

router.get('/toprated',
    productesController.toprated
);

router.get('/arrivals',
    productesController.arrivals
);

router.get('/discount',
    productesController.discount
);

router.get('/count',
    productesController.count
);

router.get('/out-of-stock',
    productesController.outofstock
);

router.get('/variant-details/:product_id',
    productesController.variantsDatils
);

router.get('/searchByName',
    productesController.searchByName
);

module.exports = router;