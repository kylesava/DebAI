const { default: mongoose } = require("mongoose")

module.exports = async () => {
    try {
        const mongo = await mongoose.connect(process.env.MONGO_URI)
        console.log(`connected to db ${mongo.connection.host}`)
    } catch (error) {
        console.log(error)
    }



}