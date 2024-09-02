const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema(
    
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: "Productes",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
    }
)

// {
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     value: {
    //         type: String,
    //         required: true
    //     }
    // }

const cartsSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        itemsSchema: [itemsSchema],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const Carts = mongoose.model("Carts", cartsSchema);
module.exports = Carts;

// {
    //     user_id: {
    //         type: mongoose.Types.ObjectId,
    //         ref: 'Users',
    //         required: true
    //     },
    //     name: {
    //         type: String,
    //         required: true,
    //         trim: true,
    //         unique: true,
    //         lowercase: true
    //     },
    //     description: {
    //         type: String,
    //         required: true,
    //         trim: true
    //     },
    //     isActive: {
    //         type: Boolean,
    //         default: true
    //     },
    //     itemsSchema: [itemsSchema]
    // },
    // {
    //     timestamps: true,
    //     versionKey: false
    // }