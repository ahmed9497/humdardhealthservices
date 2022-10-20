'use strict'; 

let success = async (res, responseData) => {
    responseData.success = 1; 
    responseData.code = "200"; 
    res.json(responseData);
};


let error = async (res, err) => {
    let responseData = {};
    responseData.success = 0,
    responseData.data = {},
    responseData.message = err,
    responseData.code = "304"
    res.json(responseData);
};


module.exports = {
    success,
    error
};