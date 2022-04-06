
require('dotenv').config()

module.exports = {
    successWithMessageResponse: (msg) => {
        return {
            status: "success", 
            status_code: 200,
            message: msg,
            backend_service: process.env.APPID
        }
    },
    successWithResultResponse: (result)=>{
        return {
            status: "success", 
            status_code: 200,
            result: result,
            backend_service: process.env.APPID
        }
    },
    successWithMessageAndResultResponse: (msg,result)=>{
        return {
            status: "success", 
            status_code: 200,
            result: result,
            message: msg,
            backend_service: process.env.APPID
        }
    },
    
    failedWithMessageResponse: (errorCode, msg)=>{
        return {
            status: "failed", 
            status_code: errorCode,
            message: msg,
            backend_service: process.env.APPID
        }
    },
    
    clientAuthFailedResponse: {
        status: "failed", 
        message: "Unauthorized Client", 
        status_code: 401,
        backend_service: process.env.APPID
    }

}