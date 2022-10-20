const mongoose = require('mongoose');



const dbConnection = () => {

    // Mongo database connection
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(() => console.log('MongoDB Connected...'))
        .catch((err) => console.log(err))
}
module.exports = { dbConnection }