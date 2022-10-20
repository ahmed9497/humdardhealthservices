const User = require("../models/auth.model");
const response = require('../config/response');



const login = async (req, res, next) => {
  
  const {email,password} = req.body ;
  let d = await User.find({ email: req.body.email }).lean();
  
  if(d.length){
    let data = d[0];
    if(data.email === email && data.password === password){        
        delete data.password;
     
        response.success(res, {
            data
        })
    }
    else{
        response.error(res,"Invalid credentials", {
            d
        })
    }

  }
  else{
    response.error(res,"Invalid credentials", {
        d
    })
  }
};
module.exports = {
  login,
};
