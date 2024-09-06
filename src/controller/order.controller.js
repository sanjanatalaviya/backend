const { default: mongoose } = require("mongoose");
const Orders = require("../model/orders.model");

const listOrder = async (req, res) => {
    try {
        const order = await Orders.find();
        if (!order || order.length === 0) {
            res.status(404).json({
                success: false,
                message: "order not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "order fetched successfully.",
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getOrder = async (req, res) => {
    try {
        const order = await Orders.findById(req.params._id);
        if (!order) {
            res.status(404).json({
                success: false,
                message: "order not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "order fetched successfully.",
            data: order
        })
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const addOrder = async (req, res) => {
    try {
        const { user_id, seller_id, payment_id, products, shipping_address, amount, discount, total_amount, status, shipping_amount } = req.body;

        if (!user_id || !seller_id || !payment_id || !products || !shipping_address || amount == null || discount == null || total_amount == null || shipping_amount == null || status == null) {
            return res.status(400).json({
                success: false,
                message: "All required order parameters are missing."
            });
        }

        const order = new Orders({
            user_id,
            seller_id,
            payment_id,
            products,
            shipping_address,
            amount,
            discount,
            total_amount,
            status,
            shipping_amount
        });

        await order.save();

        res.status(201).json({
            success: true,
            message: "Order added successfully.",
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Orders.findByIdAndDelete(req.params._id);
        console.log(order);
        if (!order) {
            res.status(404).json({
                success: false,
                message: "order data is not found."
            })
        }
        res.status(201).json({
            success: true,
            message: "order deleted successfully.",
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const updateOrder = async (req, res) => {
    try {
        const order = await Orders.findByIdAndUpdate(req.params._id, req.body, { new: true, runValidators: true });
        if (!order) {
            res.status(404).json({
                success: false,
                message: "order data is not found."
            })
        }
        res.status(200).json({
            success: true,
            message: "order updated successfully.",
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const user = async (req, res) => {
    try {
        const { user_id } = req.params;

        const orders = await Orders.find({ user_id });

        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found for this seller"
            });
        }

        res.status(200).json({
            success: true,
            message: "Orders found successfully.",
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
};

const seller = async (req, res) => {
    try {
        const { seller_id } = req.params;

        const orders = await Orders.find({ seller_id });

        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found for this seller"
            });
        }

        res.status(200).json({
            success: true,
            message: "Orders found successfully.",
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
};

const cancel = async (req, res) => {
    const cancelorders = await Orders.aggregate([
        {
            $match: { status: "cancel" }
        }
    ])
    res.status(200).json({
        success: true,
        message: 'cancelorders successfully.',
        data: cancelorders
    })
}

const product = async (req, res) => {
    try {
        const { product_id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product_id format"
            });
        }

        const orders = await Orders.find({
            'products.product_id': new mongoose.Types.ObjectId(product_id)
        });

        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found for this product"
            });
        }

        res.status(200).json({
            success: true,
            message: "Orders found successfully.",
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

module.exports = {
    listOrder,
    getOrder,
    addOrder,
    deleteOrder,
    updateOrder,
    seller,
    cancel,
    user,
    product
}