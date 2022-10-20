const mongoose = require('mongoose');

const user = mongoose.Schema({
   email:String,
   password:String,   
    role:{
        type:String,
        default:"admin"
    }

})
module.exports = mongoose.model('Users', user)