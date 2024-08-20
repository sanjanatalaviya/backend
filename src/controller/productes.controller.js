const Productes = require("../model/produtes.model");
const { uploadeFile } = require("../utils/cloudinary");

const listProductes = async (req, res) => {
    try {
        const productes = await Productes.find();

        if (!productes || productes.length === 0) {
            res.status(404).json({
                success: false,
                message: "productes not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "productes fetched successfully.",
            data: productes
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getProductes = async (req, res) => {
    try {
        const product = await Productes.findById(req.params.product_id);
        if (!product) {
            res.status(404).json({
                success: false,
                message: "product not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "product fetched successfully.",
            data: product
        })
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const addProductes = async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const fileRes = await uploadeFile(req.file.path, "product");
    console.log(fileRes);
    try {
        const product = await Productes.create({
            ...req.body,
            image: {
                public_id: fileRes.public_id,
                url: fileRes.url
            }
        });
        if (!product) {
            res.status(400).json({
                success: false,
                message: "product parameters is missing.",
            })
        }
        res.status(201).json({
            success: true,
            message: "product added successfully.",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const deleteProductes = async (req, res) => {
    try {
        const product = await Productes.findByIdAndDelete(req.params.product_id);
        if (!product) {
            res.status(404).json({
                success: false,
                message: "product data is not found."
            })
        }
        res.status(201).json({
            success: true,
            message: "product deleted successfully.",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const updateProductes = async (req, res) => {
    console.log("jgyhfhg", req.params.product_id, req.body, req.file);

    if (req.file) {
        console.log("new");

        const fileRes = await uploadeFile(req.file.path, "product");
        console.log(fileRes);

        const product = await Productes.findByIdAndUpdate(req.params.product_id,
            // { new: true, runValidators: true },
            {
                ...req.body,
                image: {
                    public_id: fileRes.public_id,
                    url: fileRes.url
                }
            });
        if (!product) {
            res.status(400).json({
                success: false,
                message: "product parameters is missing.",
            })
        }
        res.status(200).json({
            success: true,
            message: "product added successfully.",
            data: product
        })
    } else {
        console.log("old");
        try {
            const product = await Productes.findByIdAndUpdate(req.params.product_id, req.body, { new: true, runValidators: true });
            if (!product) {
                res.status(404).json({
                    success: false,
                    message: "product data is not found."
                })
            }
            res.status(200).json({
                success: true,
                message: "product updated successfully.",
                data: product
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error" + error.message
            })
        }
    }
}

const getproBySub = async (req, res) => {
    try {
        const product = await Productes.find({ subcategory_id: req.params.subcategory_id });
        if (!product) {
            res.status(404).json({
                success: false,
                message: "product data is not found."
            })
        }
        res.status(200).json({
            success: true,
            message: "product data fetched successfully.",
            data: product
        })
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// const searchProductes = async (req, res) => {
// try {
//     console.log(req.body);
//     const { sortOrder, rating, max, min, category, page, limit } = req.body;

//     const matchpip = {}

//     if (rating) {
//         matchpip['avgRating'] = {
//             $gte: rating
//         }
//     }

//     if (category) {
//         matchpip['category_id'] = category
//     }

//     matchpip['variants.attributes.Price'] = {};

//     if (max != undefined) {
//         matchpip['variants.attributes.Price'].$lte = max
//     }

//     if (min != undefined) {
//         matchpip['variants.attributes.Price'].$gte = min
//     }
//     console.log(matchpip);

//     const pipeline = [
//         {
//             $lookup: {
//                 from: "variants",
//                 localField: "_id",
//                 foreignField: "product_id",
//                 as: "variants"
//             }
//         },
//         {
//             $lookup: {
//                 from: "reviews",
//                 localField: "_id",
//                 foreignField: "product_id",
//                 as: "reviews"
//             }
//         },
//         {
//             $addFields: {
//                 avgRating: { $avg: "$reviews.rating" }
//             }
//         },
//         {
//             $unwind: "$variants"
//         },
//         {
//             $match: matchpip
//         },
//         {
//             $group: {
//                 _id: '$_id',
//                 name: { $first: '$name' },
//                 variants: { $push: "$variants" },
//                 reviews: { $push: "$reviews" }
//             }
//         },
//         {
//             $sort: {
//                 name: sortOrder === "asc" ? 1 : -1
//             }
//         }
//     ]

//     if (page > 0 && limit > 0) {
//         pipeline.push({ $skip: (page - 1) * limit })
//         pipeline.push({ $limit: limit })
//     }
//     console.log(JSON.stringify(pipeline));

//     const data = await Productes.aggregate(pipeline);
//     console.log(data);

//     res.status(200).json({
//         success: true,
//         message: 'Product aggregate successfully.',
//         data: data
//     });

// } catch (error) {
//     console.log(error);
// }
// }

const searchProductes = async (req, res) => {
    try {
        console.log(req.query);
        const { sortOrder, rating, max, min, category, page, limit } = req.query;
        const matchPip = {};

        if (rating) {
            matchPip['avgRating'] = { $gte: parseInt(rating) }
        }
        if (category) {
            matchPip['category_id'] = parseInt(category)
        }

        matchPip['variants.attributes.Price'] = {};

        if (min != undefined) {
            matchPip['variants.attributes.Price'].$gte = parseFloat(min)
        }

        if (max != undefined) {
            matchPip['variants.attributes.Price'].$lte = parseFloat(max)
        }

        console.log(matchPip);

        const pipeline = [
            {
                $lookup: {
                    from: "variants",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "variants"
                }
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "reviews"
                }
            },
            {
                $addFields: {
                    avgRating: { $avg: "$reviews.rating" }
                }
            },
            {
                $unwind: "$variants"
            },
            {
                $match: matchPip
            },
            {
                $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    variants: { $push: "$variants" },
                    reviews: { $push: "$reviews" }
                }
            },
            {
                $sort: {
                    name: sortOrder === "asc" ? 1 : -1
                }
            }
        ];

        if (page > 0 && limit > 0) {
            pipeline.push({ $skip: (parseInt(page) - 1) * parseInt(limit) })
            pipeline.push({ $limit: parseInt(limit) })
        }

        const data = await Productes.aggregate(pipeline)
        // console.log(req.query)
        // console.log(JSON.stringify(data));
        console.log("data", data);

        res.status(200).json({
            success: true,
            message: "Product data fetched...",
            data: data
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products data."
        });
    }
}

module.exports = {
    listProductes,
    getProductes,
    addProductes,
    updateProductes,
    deleteProductes,
    getproBySub,
    searchProductes
}