const mongoose = require("mongoose");

let connectionURL = "mongodb://127.0.0.1:27017/blogs_v1_api";


if (process.env.NODE_ENV === "test") {
    connectionURL = "mongodb://127.0.0.1:27017/blogs_v1_api_test";
}

const connectDB = async () => {
    try {
        await mongoose.connect(connectionURL, {
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
