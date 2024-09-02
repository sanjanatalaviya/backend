const Payments = require("../model/payments.model");

const listPayment = async (req, res) => {
    try {
        const payment = await Payments.find();
        if (!payment || payment.length === 0) {
            res.status(404).json({
                success: false,
                message: "payment not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "payment fetched successfully.",
            data: payment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getPayment = async (req, res) => {
    try {
        const payment = await Payments.findById(req.params._id);
        if (!payment) {
            res.status(404).json({
                success: false,
                message: "payment not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "payment fetched successfully.",
            data: payment
        })
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const addPayment = async (req, res) => {
    try {
        const payment = await Payments.create(req.body);
        if (!payment) {
            res.status(400).json({
                success: false,
                message: "payment parameters is missing.",
            })
        }

        res.status(201).json({
            success: true,
            message: "payment added successfully.",
            data: payment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const deletePayment = async (req, res) => {
    try {
        const payment = await Payments.findByIdAndDelete(req.params._id);
        if (!payment) {
            res.status(404).json({
                success: false,
                message: "payment data is not found."
            })
        }
        res.status(201).json({
            success: true,
            message: "payment deleted successfully.",
            data: payment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const updatePayment = async (req, res) => {
    try {
        const payment = await Payments.findByIdAndUpdate(req.params._id, req.body, { new: true, runValidators: true });
        if (!payment) {
            res.status(404).json({
                success: false,
                message: "payment data is not found."
            })
        }
        res.status(200).json({
            success: true,
            message: "payment updated successfully.",
            data: payment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const Paymentdetailsorder = async (req, res) => {
    const payment = await Payments.aggregate(
        [
            {
                $lookup: {
                    from: "payments",
                    localField: "_id",      
                    foreignField: "_id", 
                    as: "paymentDetails"     
                }
            },
            {
                $unwind: {
                    path: "$paymentDetails", 
                    preserveNullAndEmptyArrays: true 
                }
            },
            {
                $project: {
                    _id: 1,
                    order_id: 1,
                    gateway: "$paymentDetails.gateway",
                    status: "$paymentDetails.status",
                }
            }
        ]

    )
    res.status(200).json({
        success: true,
        message: "payment get  succesfully",
        data: payment
    })
}

module.exports = {
    listPayment,
    getPayment,
    addPayment,
    deletePayment,
    updatePayment,
    Paymentdetailsorder
}