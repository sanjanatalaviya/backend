const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Productes',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const ordersSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        seller_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        payment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payments',
            required: true
        },
        products: [productSchema],
        amount: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        total_amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        shipping_amount: {
            type: Number,
            required: true
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

const Orders = mongoose.model("Orders", ordersSchema);
module.exports = Orders;