const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({
    address: String,
    brothers: Number,
    city: String,
    cnic: String,
    emergencyContact: String ,
    name: String,
    phoneNumber: String, 
    serviceType: String,
    sisters: Number,
    availability:String,
    status:{
        type:String,
        default:"unblock"
    },
    role:{
        type:String,
        default:"staff"
    }

})
module.exports = mongoose.model('Staffs', staffSchema)