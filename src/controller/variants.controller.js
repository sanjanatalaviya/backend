const { default: mongoose } = require("mongoose");
const Variants = require("../model/variants.model");
const { uploadeFile } = require("../utils/cloudinary");

const listVariants = async (req, res) => {
    try {
        const variant = await Variants.find()
        console.log(variant);

        if (!variant || variant.length === 0) {
            res.status(404).json({
                success: false,
                message: "variant data not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "variant data fetched",
            data: variant,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getVariant = async (req, res) => {
    try {
        const variant = await Variants.findById(req.params.variant_id)
        if (!variant) {
            res.status(404).json({
                success: false,
                message: "Data not found." + error.message
            })
        }

        res.status(200).json({
            success: true,
            message: "Variant Data fetched",
            data: variant
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const addVariant = async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const variantimg = await uploadeFile(req.file.path, "variants");
    console.log(variantimg);
    try {
        console.log(req.body);
        const variant = await Variants.create({
            ...req.body,
            variant_image: {
                public_id: variantimg.public_id,
                url: variantimg.url
            }
        });
        if (!variant) {
            res.status(400).json({
                success: true,
                message: "failed to added variant",
                data: variant,
            });
        }
        res.status(201).json({
            success: true,
            message: "variant added successfully",
            data: variant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }

}

const updateVariant = async (req, res) => {
    console.log("jdghdgh", req.params.variant_id, req.body, req.file);

    if (req.file) {
        const variantimg = await uploadeFile(req.file.path, "variants");
        console.log(variantimg);

        const variant = await Variants.findByIdAndUpdate(
            req.params.variant_id,
            {
                ...req.body,
                variant_image: {
                    public_id: variantimg.public_id,
                    url: variantimg.url
                }
            });
        if (!variant) {
            res.status(400).json({
                success: false,
                message: "Bad request",
            });
        };
        res.status(201).json({
            success: true,
            message: "Variant updated successfully",
            data: variant,
        });
    } else {
        try {
            const variant = await Variants.findByIdAndUpdate(
                req.params.variant_id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!variant) {
                res.status(400).json({
                    success: false,
                    message: "Bad request",
                });
            };
            res.status(201).json({
                success: true,
                message: "Variant updated successfully",
                data: variant,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error: " + error.message,
            });
        }
    }
}

const deleteVariant = async (req, res) => {
    try {
        const variant = await Variants.findByIdAndDelete(req.params.variant_id);
        if (!variant) {
            res.status(404).json({
                success: false,
                message: "variant not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "variant deleted successfully",
            data: variant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const variantbypro = async (req, res) => {
    const { product_id } = req.params;
    try {
        const variantbypro = await Variants.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(product_id)
                }
            },
            {
                $lookup: {
                    from: "productes",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "productes"
                }
            },
            {
                $project: {
                    _id: 1,
                    category_name: "$name",
                    productes: "$productes"
                }
            }
        ]);
        res.status(200).json({
            success: true,
            data: variantbypro[0],
            message: "productes retrieved successfully."
        });
        console.log(variantbypro);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while retrieving productes.",
            error: error.message
        });
    }
}

const countstock = async (req, res) => {
    const variants = await Variants.aggregate([
        {
            $group: {
                _id: "$product_id",
                totalStock: { $sum: "$stock" }
            }
        },
        {
            $lookup: {
                from: "productes",
                localField: "_id",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        {
            $unwind: "$productDetails"
        },
        {
            $project: {
                productId: "$_id",
                totalStock: 1,
                "productDetails.name": 1,
                "productDetails.description": 1
            }
        }
    ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })
    console.log(variants);
}

const productslowstock = async (req, res) => {
    const variants = await Variants.aggregate([
        {
            $match: {
                stock: { $lt: 200 }
            }
        },
        {
            $group: {
                _id: "$product_id",
                totalStock: { $sum: "$stock" },
                variants: {
                    $push: {
                        variant_id: "$_id",
                        stock: "$stock",
                        price: "$price",
                        discount: "$discount",
                        attributes: "$attributes"
                    }
                }
            }
        },
        {
            $lookup: {
                from: "productes",
                localField: "_id",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        {
            $unwind: "$productDetails"
        },

        {
            $project: {
                _id: 0,
                productId: "$_id",
                totalStock: 1,
                variants: 1,
                "productDetails.name": 1,
                "productDetails.description": 1
            }
        }
    ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })
    console.log(variants);
}

const countproduct = async (req, res) => {
    const variants = await Variants.aggregate([
        {
            $group: {
                _id: "$product_id",
                countVariants: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                product_id: "$_id",
                countVariants: 1
            }
        }
    ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })
    console.log(variants);
}

const morethanonevariant = async (req, res) => {
    const variants = await Variants.aggregate([
        {
            $group: {
                _id: "$product_id",
                variantCount: { $sum: 1 },
                variants: {
                    $push: {
                        variant_id: "$_id",
                        price: "$price",
                        stock: "$stock",
                        discount: "$discount",
                        attributes: "$attributes"
                    }
                }
            }
        },
        {
            $match: {
                variantCount: { $gt: 1 }
            }
        },
        {
            $lookup: {
                from: "productes",
                localField: "_id",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        {
            $unwind: "$productDetails"
        },
        {
            $project: {
                _id: 0,
                productId: "$_id",
                variantCount: 1,
                variants: 1,
                "productDetails.name": 1,
                "productDetails.description": 1
            }
        }
    ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })

    console.log(variants);
}

const productswithhighesprices = async (req, res) => {
    const variants = await Variants.aggregate([
        {
            $sort: {
                price: -1
            }
        },
        {
            $group: {
                _id: "$product_id",
                highestPrice: { $max: "$price" },
                variants: {
                    $push: {
                        variant_id: "$_id",
                        price: "$price",
                        stock: "$stock",
                        discount: "$discount",
                        attributes: "$attributes"
                    }
                }
            }
        },
        {
            $lookup: {
                from: "productes",
                localField: "_id",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        {
            $unwind: "$productDetails"
        },
        {
            $project: {
                _id: 0,
                productId: "$_id",
                highestPrice: 1,
                variants: 1,
                "productDetails.name": 1,
                "productDetails.description": 1
            }
        },
        {
            $sort: {
                highestPrice: -1
            }
        }
    ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })
    console.log(variants);
}

const variantparticularproduct = async (req, res) => {
    const variants = await Variants.aggregate([
        {
            $lookup: {
                from: "productes",
                localField: "product_id",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        {
            $unwind: "$productDetails"
        },
        {
            $project: {
                _id: 1,
                categori_id: 1,
                subcategori_id: 1,
                product_id: 1,
                price: 1,
                stock: 1,
                discount: 1,
                attributes: 1,
                isActive: 1,
                createdAt: 1,
                updatedAt: 1,
                "productDetails._id": 1,
                "productDetails.name": 1,
                "productDetails.description": 1,
                "productDetails.price": 1,
                "productDetails.stock": 1,
                "productDetails.isActive": 1,
                "productDetails.createdAt": 1,
                "productDetails.updatedAt": 1
            }
        }
    ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })
    console.log(variants);
}

const activevarint = async (req, res) => {
    const variants = await Variants.aggregate([
        {
            $match: {
                isActive: true
            }
        },
        {
            $project: {
                _id: 1,
                categori_id: 1,
                subcategori_id: 1,
                product_id: 1,
                price: 1,
                stock: 1,
                discount: 1,
                attributes: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }
    ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })
    console.log(variants);
}

const Variantdetails = async (req, res) => {
    const variants = await Variants.aggregate([
        {
            $lookup: {
                from: "productes",
                localField: "product_id",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        {
            $unwind: "$productDetails"
        },
        {
            $project: {
                _id: 1,
                categori_id: 1,
                subcategori_id: 1,
                product_id: 1,
                price: 1,
                stock: 1,
                discount: 1,
                attributes: 1,
                isActive: 1,
                createdAt: 1,
                updatedAt: 1,
                "productDetails._id": 1,
                "productDetails.name": 1,
                "productDetails.description": 1,
                "productDetails.price": 1,
                "productDetails.stock": 1,
                "productDetails.isActive": 1,
                "productDetails.createdAt": 1,
                "productDetails.updatedAt": 1
            }
        }
    ])
    res.status(200).json({
        success: true,
        message: "variant get  succesfully",
        data: variants
    })
    console.log(variants);
}

module.exports = {
    listVariants,
    getVariant,
    addVariant,
    updateVariant,
    deleteVariant,
    variantbypro,
    countstock,
    productslowstock,
    countproduct,
    morethanonevariant,
    productswithhighesprices,
    variantparticularproduct,
    activevarint,
    Variantdetails
}