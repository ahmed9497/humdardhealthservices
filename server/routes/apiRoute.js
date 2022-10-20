const express = require('express');
const staffController = require('../controllers/staffController');
const clientController = require('../controllers/clientController');
const jobController = require('../controllers/jobController');
const paymentController =require('../controllers/paymentController');
const authController = require('../controllers/authController')
const {auth} =require('../middlewares/auth')
const router = express.Router();

router.get('/server',(req,res)=>{
    res.send("Server is running")
})
router.post('/login',authController.login)
router.post('/staff',staffController.getStaff)
router.post('/staff/add',staffController.addStaff)
router.post('/deleteStaff',staffController.deleteStaff)
router.post('/clients',clientController.getClient)
router.get('/onCall',paymentController.geOnCall)
router.post('/client/add',clientController.addClient)
router.post('/status/update',clientController.jobStatus)
router.post('/addPayment',paymentController.addPayment)
router.post('/getPayments',paymentController.getPayments)
router.post('/assignedPayments',paymentController.addAssignedStaffPayment)


module.exports = router;