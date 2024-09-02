const express = require('express');
const router = express.Router();

const categoriesRouter = require("./categories.route");
const subcategoriesRouter = require("./subcategories.route");
const productesRouter = require("./productes.route");
const variantsRouter = require("./variants.route");
const salespeopleRouter = require("./salespeople.route");
const usersRouter = require("./users.route");
const paymentRouter = require("./payment.route");
const orderRouter = require("./order.route");
const ratingRouter = require("./rating.route");
const cartRouter = require("./cart.route");


router.use("/categories", categoriesRouter);
router.use("/subcategories", subcategoriesRouter);
router.use("/productes", productesRouter);
router.use("/variants", variantsRouter);
router.use("/salespeoples", salespeopleRouter);
router.use("/users", usersRouter);
router.use("/payment", paymentRouter);
router.use("/order", orderRouter);
router.use("/rating", ratingRouter);
router.use("/cart", cartRouter);

module.exports = router;