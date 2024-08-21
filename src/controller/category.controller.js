const Categories = require("../model/categories.model")

const listCategory = async (req, res) => {
    // console.log("categorijhxvsjhdvjd", req.user);
    // console.log(req.query.page, req.query.pageSize);

    // let page = parseInt(req.query.page)
    // let pageSize = parseInt(req.query.pageSize);

    // if (page <= 0 || pageSize <= 0) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "page or pageSize is must be greater than zero."
    //     })
    // }

    try {
        const categories = await Categories.find();
        if (!categories || categories.length === 0) {
            res.status(404).json({
                success: false,
                message: "categories not found"
            });
        }

        // let startIndex = 0, endIndex = 0, pagination = [];
        // if (page > 0 && pageSize > 0) {
        //     startIndex = (page - 1) * pageSize;                     //startIndex = (3-1)* 3 = 3
        //     endIndex = startIndex + pageSize;                      //endINdex = 3+3 = 6
        //     pagination = categories.slice(startIndex, endIndex)
        // }

        // console.log(startIndex, endIndex, pagination);

        // return res.status(200).json({
        //     success: true,
        //     totalData: categories.length,
        //     message: "categories fetched successfully.",
        //     data: pagination
        // })

        res.status(200).json({
            success: true,
            message: "productes fetched successfully.",
            data: categories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await Categories.findById(req.params.category_id);
        if (!category) {
            res.status(404).json({
                success: false,
                message: "category not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "category fetched successfully.",
            data: category
        })
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const addCategory = async (req, res) => {
    try {
        const category = await Categories.create(req.body);
        if (!category) {
            res.status(400).json({
                success: false,
                message: "category parameters is missing.",
            })
        }
        res.status(201).json({
            success: true,
            message: "category added successfully.",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category = await Categories.findByIdAndDelete(req.params.category_id);
        if (!category) {
            res.status(404).json({
                success: false,
                message: "category data is not found."
            })
        }
        res.status(201).json({
            success: true,
            message: "category deleted successfully.",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const updateCategory = async (req, res) => {
    // console.log("hgsdhgsdg", req.params.category_id, req.body);
    try {
        const category = await Categories.findByIdAndUpdate(req.params.category_id, req.body, { new: true, runValidators: true });
        console.log(category);

        if (!category) {
            res.status(404).json({
                success: false,
                message: "category data is not found."
            })
        }
        res.status(200).json({
            success: true,
            message: "category updated successfully.",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

module.exports = {
    listCategory,
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory
}