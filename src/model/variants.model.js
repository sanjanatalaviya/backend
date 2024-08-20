const mongoose = require('mongoose');

const variantsSchema = new mongoose.Schema(
    {
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Categories',
            required: true
        },
        subcategory_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Subcategories',
            required: true
        },
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Productes',
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        attributes: {},
        variant_image: {
            type: {
                public_id: String,
                url: String
            },
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
)

const Variants = mongoose.model("Variants", variantsSchema);
module.exports = Variants;