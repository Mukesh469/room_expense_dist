import mongoose from "mongoose"

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log(`database connected successfully.`);
    } catch (e) {
        console.error(`couldn't connect to Database!`, e);
        process.exit(1);
    }
}

export default connectDB;