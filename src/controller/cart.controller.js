const Carts = require("../model/carts.model");

const listCart = async (req, res) => {
    try {
        const cart = await Carts.find();
        if (!cart || cart.length === 0) {
            res.status(404).json({
                success: false,
                message: "cart not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "cart fetched successfully.",
            data: cart
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getCart = async (req, res) => {
    try {
        const cart = await Carts.findById(req.params._id);
        if (!cart) {
            res.status(404).json({
                success: false,
                message: "cart not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "cart fetched successfully.",
            data: cart
        })
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const addCart = async (req, res) => {
    // try {
    //     const cart = await Carts.create(req.body);
    //     if (!cart) {
    //         res.status(400).json({
    //             success: false,
    //             message: "cart parameters is missing.",
    //         })
    //     }
    //     res.status(201).json({
    //         success: true,
    //         message: "cart added successfully.",
    //         data: cart
    //     })
    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: "Internal server error" + error.message
    //     })
    // }
    try {
        const { user_id, isActive = true, itemsSchema } = req.body;
        console.log("hjvsajcsdjh", req.body);

        let cart = await Carts.findOne({ user_id });
        if (!cart) {

            cart = new Carts({ user_id, isActive, itemsSchema });
        } else {
            itemsSchema.forEach(item => {
                const itemIndex = cart.itemsSchema.findIndex(v => v.product_id.toString() === item.product_id);
                console.log("adxagsch", itemIndex);
                if (itemIndex !== -1) {
                    cart.itemsSchema[itemIndex].quantity += item.quantity;
                } else {
                    cart.itemsSchema.push({ product_id: item.product_id, quantity: item.quantity });
                }
            });
        }
        await cart.save();
        res.status(201).json({
            success: true,
            message: 'Cart updated successfully.',
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message
        });
    }

}

const deleteCart = async (req, res) => {
    try {
        const cart = await Carts.findByIdAndDelete(req.params._id);
        if (!cart) {
            res.status(404).json({
                success: false,
                message: "cart data is not found."
            })
        }
        res.status(201).json({
            success: true,
            message: "cart deleted successfully.",
            data: cart
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const cart = await Carts.findByIdAndUpdate(req.params._id, req.body, { new: true, runValidators: true });
        if (!cart) {
            res.status(404).json({
                success: false,
                message: "cart data is not found."
            })
        }
        res.status(200).json({
            success: true,
            message: "cart updated successfully.",
            data: cart
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

module.exports = {
    getCart,
    listCart,
    addCart,
    deleteCart,
    updateCart
}