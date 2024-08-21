const mongoose = require('mongoose');

const productesSchema = new mongoose.Schema(
    {
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories',
            required: true
        },
        subcategory_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Subcategories',
            required: true
        },
        seller_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Users'
        },
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            trim: true
        },
        image: {
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

const Productes = mongoose.model("Productes", productesSchema);
module.exports = Productes;