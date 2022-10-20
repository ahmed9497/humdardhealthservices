import authHeader from './auth.header';
import http from './httpServices';

const API_URL = process.env.REACT_APP_API_URL;


const signIn = async (req) => {

    return await http.post(API_URL + `/login`,req,
        {
            headers: authHeader(),

        })
}
const addStaff = async (req) => {

    return await http.post(API_URL + `/staff/add`,req,
        {
            headers: authHeader(),

        })
}
const addClient = async (req) => {

    return await http.post(API_URL + `/client/add`,req,
        {
            headers: authHeader(),

        })
}


const assignPayments= async (req) => {

    return await http.post(API_URL + `/assignedPayments`,req,
        {
            headers: authHeader(),

        })
}
const deleteUser = async (req) => {

    return await http.post(API_URL + `/deleteStaff`,req,
        {
            headers: authHeader(),

        })
}

const fetchPayments = async (req) => {

    return await http.post(API_URL + `/getPayments`,req,
        {
            headers: authHeader(),

        })
}
const fetchStaff = async (req) => {

    return await http.post(API_URL + `/staff`,req,
        {
            headers: authHeader(),

        })
}
const updateStatus = async (req) => {

    return await http.post(API_URL + `/status/update`,req,
        {
            headers: authHeader(),

        })
}
const fetchClients = async (req) => {

    return await http.post(API_URL + `/clients`,req,
        {
            headers: authHeader(),

        })
}


const dashboardOnCall = async () => {

    return await http.get(API_URL + `/onCall`,
        {
            headers: authHeader(),

        })
}


const getUsers = async (req) => {

    return await http.post(API_URL + `/getusers`,req,
        {
            headers: authHeader(),

        })
}


const addPayment = async (req) => {

    return await http.post(API_URL + `/addPayment`,req,
        {
            headers: authHeader(),

        })
}
export {
    addPayment,
    signIn,
    fetchPayments,
    addStaff,
    addClient,
    fetchStaff,
    deleteUser,
    dashboardOnCall,
    getUsers,
    fetchClients,
    assignPayments,
    updateStatus
}