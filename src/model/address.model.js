const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            // type: String,
            // required: true
        },
        blocknumber: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        locality: {
            type: String, required: true
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

const Address = mongoose.model("Addresses", addressSchema);
module.exports = Address;