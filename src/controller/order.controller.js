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
        const order = await Orders.create(req.body);
        if (!order) {
            res.status(400).json({
                success: false,
                message: "order parameters is missing.",
            })
        }

        res.status(201).json({
            success: true,
            message: "order added successfully.",
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

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

module.exports = {
    listOrder,
    getOrder,
    addOrder,
    deleteOrder,
    updateOrder
}