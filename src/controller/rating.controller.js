const { default: mongoose } = require("mongoose");
const Rating = require("../model/rating.model");

const listRating = async (req, res) => {
    try {
        const rating = await Rating.find();
        if (!rating || rating.length === 0) {
            res.status(404).json({
                success: false,
                message: "rating not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "rating fetched successfully.",
            data: rating
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getRating = async (req, res) => {
    try {
        const rating = await Rating.findById(req.params._id);
        if (!rating) {
            res.status(404).json({
                success: false,
                message: "rating not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "rating fetched successfully.",
            data: rating
        })
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const addRating = async (req, res) => {
    try {
        const { product_id, user_id, rating, review } = req.body;

        if (!product_id || !user_id || rating === undefined || !review) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        const newRating = await Rating.create({
            product_id,
            user_id,
            rating,
            review,
        });

        res.status(201).json({
            success: true,
            message: "Rating added successfully",
            data: newRating,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};


const deleteRating = async (req, res) => {
    try {
        const rating = await Rating.findByIdAndDelete(req.params._id);
        console.log(rating);
        if (!rating) {
            res.status(404).json({
                success: false,
                message: "rating data is not found."
            })
        }
        res.status(201).json({
            success: true,
            message: "rating deleted successfully.",
            data: rating
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const updateRating = async (req, res) => {
    try {
        const rating = await Rating.findByIdAndUpdate(req.params._id, req.body, { new: true, runValidators: true });
        if (!rating) {
            res.status(404).json({
                success: false,
                message: "rating data is not found."
            })
        }
        res.status(200).json({
            success: true,
            message: "rating updated successfully.",
            data: rating
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const countProduct = async (req, res) => {
    const Ratinge = await Rating.aggregate(
        [
            {
                $group: {
                    _id: "$product_id",
                    review_count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    review_count: -1
                }
            }
        ]
    )
    res.status(200).json({
        success: true,
        message: 'Rating get successfully.',
        data: Ratinge
    })
}

const topratedproducts = async (req, res) => {
    const Ratinge = await Rating.aggregate(
        [
            {
                $sort: {
                    average_rating: -1
                }
            },
            {
                $limit: 1
            }
        ]
    )
    res.status(200).json({
        success: true,
        message: 'Ratinge topratedproducts successfully.',
        data: Ratinge
    })
}

const includecomments = async (req, res) => {
    const review = await Rating.aggregate(
        [
            {
                $match: {
                    review: {
                        $exists: true,
                        $ne: ""
                    }
                }
            }
        ]
    )
    res.status(200).json({
        success: true,
        message: 'review fetch successfully.',
        data: review
    })
}

const NoReviews = async (req, res) => {
    const reviews = await Rating.aggregate(
        [
            {
                $lookup: {
                    from: "ratings",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "rating"
                }
            },
            {
                $match: {
                    rating: { $size: 0 }
                    // rating: { $eq: [] }
                }
            }
        ]
    )
    res.status(200).json({
        success: true,
        message: 'Reviews fetched successfully.',
        data: reviews
    });
}

const approveReviews = async (req, res) => {
    const { _id, status } = req.params;

    const isApproved = status === 'approved' ? true : status === 'disapproved' ? false : null;

    if (isApproved === null) {
        return res.status(400).json({
            success: false,
            message: 'Invalid status. Use "approved" or "disapproved".'
        });
    }
    const result = await Rating.updateOne(
        { _id: new mongoose.Types.ObjectId(_id) },
        { $set: { isApproved: isApproved } }
    );

    if (result.matchedCount === 0) {
        return res.status(404).json({
            success: false,
            message: 'Review not found.',
        });
    }
    res.status(200).json({
        success: true,
        message: `Review ${status} successfully`,
        data: result
    })
    console.log(result);
}

const reviewofuser = async (req, res) => {
    try {
        const { user_id } = req.params;

        const reviews = await Rating.aggregate([
            {
                $match: {
                    user_id: new mongoose.Types.ObjectId(user_id)
                }
            }
        ]
        )
        res.status(200).json({
            success: true,
            message: "reviews get  succesfully",
            data: reviews
        })

        console.log(reviews);
    } catch (error) {
        console.log(error);
    }
}

const reviewofproduct = async (req, res) => {
    const { product_id } = req.params;
    try {
        const reviews = await Rating.aggregate([
            {
                $match: {
                    product_id: new mongoose.Types.ObjectId(product_id)
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: 'Reviews fetched successfully.',
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching reviews.',
            error: error.message
        });
    }
}

module.exports = {
    listRating,
    getRating,
    addRating,
    deleteRating,
    updateRating,
    countProduct,
    topratedproducts,
    includecomments,
    NoReviews,
    approveReviews,
    reviewofuser,
    reviewofproduct
}