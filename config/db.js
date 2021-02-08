const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/expensetracker", { //fix env fetch error.
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        console.log("mongodb connected");
    }

    catch (err) {
        console.log("error" + err.message);
        process.exit(1);
    }
}

module.exports = connectDB;