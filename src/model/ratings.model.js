const mongoose = require('mongoose');

const shippingsSchema = new mongoose.Schema(
    {
        orders_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Orders',
            required: true
        },
        products_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Productes',
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
        timeseries: true,
        versionKey: false
    }
)

const Shippings = mongoose.model("Shippings", shippingsSchema);
module.exports = Shippings;