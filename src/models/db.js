const mongoose = require('mongoose');

const connect = async () => {
    try {
        console.log(process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connected to mongoose');
    } catch (err) {
        console.log('Error connecting to mongoose', err);
    }
}

module.exports = {
    connect,
}