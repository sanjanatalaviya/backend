const { default: mongoose } = require("mongoose");
const Categories = require("../model/categories.model")

const listCategory = async (req, res) => {
    console.log("categorijhxvsjhdvjd", req.user);
    // console.log(req.query.page, req.query.pageSize);

    let page = parseInt(req.query.page)
    let pageSize = parseInt(req.query.pageSize);

    if (page <= 0 || pageSize <= 0) {
        return res.status(400).json({
            success: false,
            message: "page or pageSize is must be greater than zero."
        })
    }

    try {
        const categories = await Categories.find();
        if (!categories || categories.length === 0) {
            res.status(404).json({
                success: false,
                message: "categories not found"
            });
        }

        let startIndex = 0, endIndex = 0, pagination = [...categories];
        if (page > 0 && pageSize > 0) {
            startIndex = (page - 1) * pageSize;                     //startIndex = (3-1)* 3 = 3
            endIndex = startIndex + pageSize;                      //endINdex = 3+3 = 6
            pagination = categories.slice(startIndex, endIndex)
        }

        // console.log(startIndex, endIndex, pagination);

        return res.status(200).json({
            success: true,
            totalData: categories.length,
            message: "categories fetched successfully.",
            data: pagination
        })

        // res.status(200).json({
        //     success: true,
        //     message: "productes fetched successfully.",
        //     data: categories
        // })
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

const inActive = async (req, res) => {
    const category = await Categories.aggregate(
        [
            {
                $match: {
                    "isActive": false
                }
            },
            {
                $group: {
                    _id: "_id",
                    "totalInactive": {
                        $sum: 1
                    }
                }
            }
        ]
    )
    res.status(200).json({
        success: true,
        message: "category inActive successfully.",
        data: category
    })
    console.log(category);
}

const active = async (req, res) => {
    const category = await Categories.aggregate(
        [
            {
                $match: {
                    "isActive": true
                }
            },
            {
                $group: {
                    _id: "_id",
                    "totalActive": {
                        $sum: 1
                    }
                }
            }
        ]
    )
    res.status(200).json({
        success: true,
        message: "category inActive successfully.",
        data: category
    })
    console.log(category);
}

const highproduct = async (req, res) => {
    const category = await Categories.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "categori_id",
                "as": "products"
            }
        },
        {
            $project: {
                categoryName: "$name",
                productCount: { "$size": "$products" }
            }
        },
        {
            $sort: {
                "productCount": -1
            }
        },
        {
            $limit: 3
        }
    ])
    res.status(200).json({
        success: true,
        message: "category inActive successfully.",
        data: category
    })
    console.log(category);
}

const averagenproduct = async (req, res) => {
    const averagenuproduct = await Categories.aggregate([
        {
            $group: {
                _id: "$category_id",
                productCount: { $sum: 1 }
            }
        },
        {
            $group: {
                _id: "null",
                averageCount: { $avg: "$productCount" }
            }
        }
    ]);
    res.status(200).json({
        success: true,
        message: "countsubcate get  succesfully",
        data: averagenuproduct
    })
    console.log(averagenuproduct);
}

const countsubcategories = async (req, res) => {
    const countsubcate = await Categories.aggregate([
        {
            $lookup: {
                from: "subcategories",
                localField: "_id",
                foreignField: "category_id",
                as: "Subacategory"
            }
        },
        {
            $project: {
                _id: 1,
                category_name: "$name",
                countsubcategories: "$Subacategory"
            }
        }
    ]);
    res.status(200).json({
        success: true,
        message: "countsubcate get  succesfully",
        data: countsubcate
    })
    console.log(countsubcate);
}

const subcategorioncategori = async (req, res) => {
    const { category_id } = req.params;
    try {
        const retviecategoryonsubcate = await Categories.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(category_id)
                }
            },
            {
                $lookup: {
                    from: "subcategories",
                    localField: "_id",
                    foreignField: "category_id",
                    as: "subcategories"
                }
            },
            {
                $project: {
                    _id: 1,
                    category_name: "$name",
                    subcategories: "$subcategories"
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: "Subcategories retrieved successfully.",
            data: retviecategoryonsubcate[0]
        });
        console.log(retviecategoryonsubcate);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while retrieving subcategories.",
            error: error.message
        });
    }
}

module.exports = {
    listCategory,
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory,
    inActive,
    active,
    highproduct,
    averagenproduct,
    countsubcategories,
    subcategorioncategori
}