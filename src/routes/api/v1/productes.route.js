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
)

module.exports = router;