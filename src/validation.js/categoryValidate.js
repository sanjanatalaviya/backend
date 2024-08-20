const Joi = require("joi")

const getCategory = {
    query: Joi.object().keys({
        cat_id: Joi.string().required()
    })
}

const createCategory = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow('')
    })
}

const updateCategory = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow('')
    }),
    params: Joi.object().keys({
        category_id: Joi.string().required()
    })
}

const deleteCategory = {
    params: Joi.object().keys({
        category_id: Joi.string().required()
    })
}

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}