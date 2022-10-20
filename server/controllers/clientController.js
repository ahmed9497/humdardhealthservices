const Client = require('../models/clients.models');
const AssignedJobs = require('../models/assignedJobs.models');
const response = require('../config/response');

const getClient = async (req, res) => {
    // res.send('hi tyiy');
    const data = await Client.find().lean()
      
        .exec();
    // res.send(response)
    response.success(res, {
        data
    })
}


const getOnCall = async (req, res) => {

    const data = await Client.find({status:"open"})


    .populate({path:'assignStaff'}).lean()
    // .populate({path:'clientId'})
    .exec();
    // res.send(response);
    response.success(res, {
        data
    })
}
const addClient = (req, res) => {

    const mclient = new Client({
        ...req.body
    });
    mclient.save().then(resp =>{
        const newjob = new AssignedJobs({
            staffId: req.body.assignStaff,
            clientId:resp._id
        })
        newjob.save();
        response.success(res, {
            data: resp
        })
        
    })


}
const jobStatus =async (req, res) => {

    const mclient = await Client.findByIdAndUpdate(req.body.id,{
        jobStatus:req.body.status
    });
    mclient.save().then(resp =>{
       
        response.success(res, {
            data: resp
        })
        
    })


}

module.exports = { getClient, addClient ,getOnCall,jobStatus}