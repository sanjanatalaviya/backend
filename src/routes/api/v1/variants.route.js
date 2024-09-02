const express = require('express');
const { variantsController } = require('../../../controller');
const upload = require('../../../middleware/upload');

const router = express.Router();

router.get('/list-variant',
    variantsController.listVariants
);

router.get('/get-variant/:variant_id',
    variantsController.getVariant
);

router.post('/add-variant',
    upload.single('variant_image'),
    variantsController.addVariant
);

router.put('/update-variant/:variant_id',
    upload.single('variant_image'),
    variantsController.updateVariant
);

router.delete('/delete-variant/:variant_id',
    variantsController.deleteVariant
);

router.get('/varianbypro/:product_id',
    variantsController.variantbypro
);

router.get('/countstock/:product_id',
    variantsController.countstock
);

router.get('/productslowstock',
    variantsController.productslowstock
);

router.get('/countproduct',
    variantsController.countproduct
);

router.get('/morethanonevariant',
    variantsController.morethanonevariant
);

router.get('/productswithhighesprices',
    variantsController.productswithhighesprices
);

router.get('/variantparticularproduct',
    variantsController.variantparticularproduct
);

router.get('/activevarint',
    variantsController.activevarint
);

router.get('/Variantdetails',
    variantsController.Variantdetails
)

module.exports = router;