const { salespeopleCont } = require("../model");

const listSales = async (req, res) => {
    try {
        const salespeople = await salespeopleCont.getSales();
        console.log(salespeople);
        res.status(200).json({
            success: true,
            data: salespeople,
            message: "salespeople data is fetched successfully."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error."
        })
    }
}

const insertSales = async (req, res) => {
    try {
        const { sname, city, comm, isActive, createdAt, updatedAt } = req.body;
        const result = await salespeopleCont.insertSalesperson(sname, city, comm, isActive, createdAt, updatedAt);
        // res.status(201).json({
        //     success: true,
        //     data: salespeople,
        //     message: "salespeople data is fetched successfully."
        // });
        res.status(201).json({ message: "Salesperson added successfully", insertedId: result.insertId });
    } catch (error) {
        console.error("Error adding salesperson:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error."
        })
    }
}

const deleteSales = async (req, res) => {
    try {
        const { snum } = req.params;
        const salespeople = await salespeopleCont.deleteSalespeople(snum);
        res.status(200).json({
            success: true,
            data: salespeople,
            message: "salespeople data is deleted successfully."
        });
    } catch (error) {
        console.error("Error deleting salesperson:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error."
        })
    }
}

const updateSales = async (req, res) => {
    try {
        const { snum } = req.params;
        const { sname, city, comm, isActive, createdAt, updatedAt } = req.body;
        const salespeople = await salespeopleCont.updateSalespeople(snum, sname, city, comm, isActive, createdAt, updatedAt);
        res.status(200).json({
            success: true,
            data: salespeople,
            message: "salespeople data is updated successfully."
        });
    } catch (error) {
        console.error("Error updating salesperson:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error."
        })
    }
}

module.exports = {
    listSales,
    insertSales,
    deleteSales,
    updateSales
}