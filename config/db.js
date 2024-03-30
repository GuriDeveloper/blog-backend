const mongoose = require(`mongoose`);


const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Db connected... on host ${conn.connection.host}`)
    } catch (error) {
        console.log(`cannot connect db due to : ${error.message}`)
    }

}

module.exports = dbConnect