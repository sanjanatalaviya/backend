const mongoose = require('mongoose');

const paymentsSchema = new mongoose.Schema(
    {
        oreder_id: {
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
    }
)

const Payments = mongoose.model("Payments", paymentsSchema);
module.exports = Payments;