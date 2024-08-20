const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        status: {
            type: Boolean,
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