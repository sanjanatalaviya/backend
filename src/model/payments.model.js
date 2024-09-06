const mongoose = require('mongoose');

const paymentsSchema = new mongoose.Schema(
    {
        order_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Orders',
            required: true
        },
        type: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            require: true
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

const Payments = mongoose.model("Payments", paymentsSchema);
module.exports = Payments;