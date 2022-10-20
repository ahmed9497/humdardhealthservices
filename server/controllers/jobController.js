const AssignedJobs = require('../models/assignedJobs.models');

const response = require('../config/response');

const getOnCall = async (req, res) => {

    const data = await AssignedJobs.find()


    .populate({path:'staffId'})
    .populate({path:'clientId'})
    .exec();
    // res.send(response);
    response.success(res, {
        data
    })
}


module.exports = { getOnCall }