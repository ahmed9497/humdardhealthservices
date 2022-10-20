const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    address:String,   
    city:String,
    modeOfService:String,
    name:String,
    diagnosis:String,
    // payment:String,
    phoneNumber:String,
    salary:String,
    serviceType:String,
    jobStatus:{
        type:String,
        default:"close"
    }
    // assignStaff: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Staffs' }]
})
module.exports = mongoose.model('Clients', clientSchema)