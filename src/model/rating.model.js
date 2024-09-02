const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Productes',
            required: true
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        review: {
            type: String,
            required: true,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Rating = mongoose.model("Ratings", ratingSchema);
module.exports = Rating;