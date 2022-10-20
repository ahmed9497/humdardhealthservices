const mongoose = require('mongoose');

const assignedStaffPayment = mongoose.Schema({
   
    paymentId:{ type: mongoose.Schema.Types.ObjectId, ref: 'clientpayments' },
    assignStaff : { type: mongoose.Schema.Types.ObjectId, ref: 'staffs' },
    clientId : { type: mongoose.Schema.Types.ObjectId, ref: 'clients' },
    salary:String,
    date:Object

})
module.exports = mongoose.model('AssignedStaffPayments', assignedStaffPayment)