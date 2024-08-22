const Joi = require("joi");
const pick = require("../helper/pick");

const validation = (schema) => (req, res, next) => {
    // console.log(schema);
    console.log(req.body);
    // console.log(Object.keys(schema));

    const objs = pick(req, Object.keys(schema));
    // console.log(objs);

    const { error, value } = Joi.compile(schema)
        .prefs({
            abortEarly: false
        })
        .validate(objs);
    console.log(error, value);

    if (error) {
        const errMsg = error.details.map((err) => err.message).join(", ");
        next(new Error("validation error", errMsg))
    }
    Object.assign(req, value);
    next();
}

module.exports = validation;