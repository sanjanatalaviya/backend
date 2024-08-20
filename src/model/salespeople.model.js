const pool = require("../db/mysql")

const getSales = async () => {
    try {
        const [results, field] = await pool.execute("SELECT * FROM salespeople");
        return results;
    } catch (error) {
        throw new Error("Error getting salespeople: " + error.message);
    }
};

const insertSalesperson = async (sname, city, comm, isActive) => {
    try {
        const sql = "INSERT INTO salespeople (sname, city, comm, isActive\) VALUES (?, ?, ?, ?)";

        const values = [sname, city, comm, isActive];
        const result = await pool.execute(sql, values);
        console.log("Inserted:", result);
        return ({ id: result.insertId, sname, city, comm, isActive })
        // return result;
    } catch (error) {
        throw new Error("Error inserting salesperson:" + error.message);
    }
};

const deleteSalespeople = async (snum) => {
    try {
        const [result] = await pool.execute("DELETE FROM salespeople WHERE SNUM=?", [snum]);
        console.log(result);
        return result;
    } catch (error) {
        throw new Error("Error deleting salespeople:" + error.message);
    }
};

const updateSalespeople = async (snum, sname, city, comm, isActive) => {
    console.log(snum, sname, city, comm);
    try {
        const [result] = await pool.execute("UPDATE salespeople SET sname=?, city=?, comm=? isActive=? WHERE SNUM=?", [sname, city, comm, snum, isActive]);
        console.log(result);
        return result
    } catch (error) {
        throw new Error("Error updating salespeople:" + error.message);
    }
}

module.exports = {
    getSales,
    insertSalesperson,
    deleteSalespeople,
    updateSalespeople
}