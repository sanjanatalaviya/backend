const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB__ECOMMERCE_URL)
            // await mongoose.connect(process.env.MONGODB_URL)
            .then(() => { console.log('MongoDB Is Connected Successfully.') })
            .catch((error) => { console.log('MongoDB is connectection error.' + error) })
    } catch (error) {
        console.log('MongoDB is connectection error.' + error)
    }
}

module.exports = connectDB;