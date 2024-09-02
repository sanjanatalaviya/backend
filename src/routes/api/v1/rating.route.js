const express = require('express');
const { ratingController } = require("../../../controller");

const router = express.Router();

router.get('/list-rating',
    ratingController.listRating
);

router.get('/get-rating/:_id',
    ratingController.getRating
);

router.post('/add-rating',
    ratingController.addRating
);

router.delete('/delete-rating/:_id',
    ratingController.deleteRating
);

router.put('/update-rating/:_id',
    ratingController.updateRating
);

router.get('/count-products',
    ratingController.countProduct
);

router.get('/top-rated-products',
    ratingController.topratedproducts
);

router.get('/with-comments',
    ratingController.includecomments
);

router.get('/no-reviews',
    ratingController.NoReviews
)

module.exports = router;