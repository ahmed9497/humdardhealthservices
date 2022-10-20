const Staff = require('../models/staff.models');
const response = require('../config/response');

const getStaff = async(req, res) => {
    let data='';
    if(req.body.availability){
         data =await Staff.find({availability:req.body.availability})
        .exec();
    }
    else{
        data =await Staff.find({status:"unblock"}).exec();

    }
    // .populate({path:'friends',model:Users})
   
    // res.send(response);
    response.success(res, {
        data
    })
}
const addStaff = (req, res) => {
  
  
    const staff = new Staff({
        ...req.body
    })
    staff.save().then(resp=>response.success(res, {
        data:resp
    }))
}
const deleteStaff = async(req, res) => {
  
    const id = req.body.id ;
    console.log(id)
    const staff = await Staff.findByIdAndUpdate(id,{
        status:"block"
    })
    staff.save().then(resp=>response.success(res, {
        data:resp
    }))
}

module.exports = { getStaff, addStaff,deleteStaff }