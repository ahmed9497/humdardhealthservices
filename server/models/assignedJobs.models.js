const mongoose = require('mongoose');

const assignedJob = mongoose.Schema({
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staffs' },
    clientId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Clients' }
})
module.exports = mongoose.model('AssignedJobs', assignedJob)