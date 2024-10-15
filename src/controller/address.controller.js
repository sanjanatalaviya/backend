const Address = require("../model/address.model");

const listAddress = async (req, res) => {
    try {
        const address = await Address.find();

        if (!address || address.length === 0) {
            res.status(404).json({
                success: false,
                message: "address not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "address fetched successfully.",
            data: address
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getAddress = async (req, res) => {
    try {
        const address = await Address.findById(req.params._id);
        if (!address) {
            res.status(404).json({
                success: false,
                message: "address not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "address fetched successfully.",
            data: address
        })
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const addAddress = async (req, res) => {
    const address = await Address.create(req.body);
    if (!address) {
        res.status(400).json({
            success: false,
            message: "address parameters is missing.",
        })
    }
    res.status(201).json({
        success: true,
        message: "address added successfully.",
        data: address
    })
}

const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findByIdAndDelete(req.params._id);
        if (!address) {
            res.status(404).json({
                success: false,
                message: "address data is not found."
            })
        }
        res.status(201).json({
            success: true,
            message: "address deleted successfully.",
            data: address
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const updateAddress = async (req, res) => {
    console.log("jgyhfhg", req.params._id, req.body);
    try {
        const address = await Address.findByIdAndUpdate(req.params._id, req.body, { new: true, runValidators: true });
        if (!address) {
            res.status(404).json({
                success: false,
                message: "address data is not found."
            })
        }
        res.status(200).json({
            success: true,
            message: "address updated successfully.",
            data: address
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

module.exports = {
    getAddress,
    listAddress,
    addAddress,
    deleteAddress,
    updateAddress
}