const Subcategories = require("../model/subcategories.model")

const listSubcategory = async (req, res) => {
    try {
        const subcategories = await Subcategories.find();
        if (!subcategories || subcategories.length === 0) {
            res.status(404).json({
                success: false,
                message: "subcategories not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "subcategories fetched successfully.",
            data: subcategories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategories.findById(req.params.subcategory_id);
        if (!subcategory) {
            res.status(404).json({
                success: false,
                message: "subcategory not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "subcategory fetched successfully.",
            data: subcategory
        })
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const addSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategories.create(req.body);
        if (!subcategory) {
            res.status(400).json({
                success: false,
                message: "subcategory parameters is missing.",
            })
        }

        res.status(201).json({
            success: true,
            message: "subcategory added successfully.",
            data: subcategory
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const deleteSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategories.findByIdAndDelete(req.params.subcategory_id);
        console.log(subcategory);
        if (!subcategory) {
            res.status(404).json({
                success: false,
                message: "subcategory data is not found."
            })
        }
        res.status(201).json({
            success: true,
            message: "subcategory deleted successfully.",
            data: subcategory
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const updateSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategories.findByIdAndUpdate(req.params.subcategory_id, req.body, { new: true, runValidators: true });
        if (!subcategory) {
            res.status(404).json({
                success: false,
                message: "subcategory data is not found."
            })
        }
        res.status(200).json({
            success: true,
            message: "subcategory updated successfully.",
            data: subcategory
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getsubByCategory = async (req, res) => {
    try {
        const subcategories = await Subcategories.find({ category_id: req.params.category_id });
        if (!subcategories) {
            res.status(404).json({
                success: false,
                message: "subcategory data is not found."
            })
        }
        res.status(200).json({
            success: true,
            message: "subcategory data fetched successfully.",
            data: subcategories
        })
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = {
    listSubcategory,
    getSubcategory,
    addSubcategory,
    updateSubcategory,
    deleteSubcategory,
    getsubByCategory
}