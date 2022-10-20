import { message } from "antd";
import axios from "axios";

/*to check if same request in queue*/




/*Expired token not allowed in refresh token request*/


/* Setting request headers*/
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers.common["Content-Type"] = "application/json";
// // axios.defaults.headers.common["X-Forwarded-For"] = "119.160.103.211";
// axios.defaults.headers.common["token"] =
//   Date.now() + Math.random().toFixed(10).slice(2);

// axios.defaults.headers.common["authorization"] = "Bearer";
/*Attaching token in request if got from storage*/
// const user = JSON.parse(localStorage.getItem('auth'));
let loader = "";
axios.interceptors.request.use(
  (config) => {

    loader = document.getElementById("loader-wrapper");
    loader.style.display = "block"

    // if (user?.token) {
    //   // config.headers.common["x-access-token"] = user?.token ;

    // }
    return config;
    //   let currentLang = localStorage.getItem("currentLang") || "fr";
    //   config.headers.common["lang"] = currentLang.slice(0, 2);
    //   const { sid, userMSISDN } = tokenStorage.getUserSession();

    //   if(config?.data){

    //       const RequestBody = config?.data ;
    //       const hashDigest = sha256(RequestBody + salt).toString();
    //       config.headers.common["requestAuth"] = hashDigest ;

    //   }
    //   if (config.headers.Authorization) {
    //     if (sid) {
    //       config.headers["token"] =
    //         Date.now() +
    //         Math.random().toFixed(10).slice(2) +
    //         "(" +
    //         utils.makeTokenMsisdn(userMSISDN) +
    //         ")";

    //     }
    //   } else {
    //     if (sid && sendToken) {
    //       config.headers["Authorization"] = btoa(sid);
    //       config.headers["token"] =
    //         Date.now() +
    //         Math.random().toFixed(10).slice(2) +
    //         "(" +
    //         utils.makeTokenMsisdn(userMSISDN) +
    //         ")";
    //     }
    //   }
    //   return config;
    // },
    // (error) => {
    //   /*Error Handling*/
    //   return Promise.reject(error);
  }
);

/*Intercepting the response in case of specif status codes*/
axios.interceptors.response.use(
  function (success) {
    loader.style.display = "none"

    let { data } = success;


    return Promise.resolve(data);
    // if (data.responseCode === "1401") {
    //   // cogoToast.error("Session Terminated will be logout");
    //   let getLastLang = localStorage.getItem("currentLang");
    //   localStorage.clear();
    //   localStorage.setItem("currentLang", getLastLang);
    //   // window.location.href = "/maroc";
    //   return Promise.reject(success);
    // } else return Promise.resolve(success);
  },
  function (error) {
    loader.style.display = "none"


    if (error?.response?.status === 401) {

      message?.error(error?.response?.data?.message);
      localStorage.clear();
      setTimeout(() => {
        window.location.href = '/pmis#/login'
      }, 1000);
    }
    if (error?.response?.status === 500) {
      localStorage.clear();
      message?.error(error?.response?.data?.message);
      setTimeout(() => {
        window.location.href = '/pmis#/login'
      }, 1000);


    }
    if (error?.response?.status === 404) {
      message?.error(error?.response?.data?.message);

    }
    if (error?.response?.status === 409) {
      // localStorage.clear();
      // window.location.assign("/");
      message?.error(error?.response?.data?.message);
      // window.location.assign("/pmis#/login");


    }
    if (error?.response?.status === 403) {

      localStorage.clear();
      message?.error(error?.response?.data?.message);
      setTimeout(() => {
        window.location.href = '/pmis#/login'
      }, 1000);
    }
    if (error?.response?.status === 430) {
    
      message?.error(error?.response?.data?.message);
      // localStorage.clear();
      // window.location.assign("/");
    }
    // if (error.response && error.response.data && error.response.data.message) {
    //   /*Showing response from the server*/
    //   cogoToast.error(error.response.data.message, { position: "top-right" });
    // } else {
    //   /*Showing response from local*/
    //   // cogoToast.error(
    //   //   "Currently experiencing some trouble accessing the back-end services. Please try again in a short while.",
    //   //   { position: "top-right" }
    //   // );
    // }

    /*if all above process failes breaking the queue*/
    return Promise.reject(error);
  }
);

const logger = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
export default logger;
