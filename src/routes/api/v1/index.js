const express = require('express');
const router = express.Router();

const categoriesRouter = require("./categories.route");
const subcategoriesRouter = require("./subcategories.route");
const productesRouter = require("./productes.route");
const variantsRouter = require("./variants.route");
const salespeopleRouter = require("./salespeople.route");
const usersRouter = require("./users.route");

router.use("/categories", categoriesRouter);
router.use("/subcategories", subcategoriesRouter);
router.use("/productes", productesRouter);
router.use("/variants", variantsRouter);
router.use("/salespeoples", salespeopleRouter);
router.use("/users", usersRouter);

module.exports = router;