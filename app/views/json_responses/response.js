module.exports = {
    successWithMessageResponse: (msg) => {
        return {
            status: "success", 
            status_code: 200,
            message: msg
        }
    },
    successWithResultResponse: (result)=>{
        return {
            status: "success", 
            status_code: 200,
            result: result
        }
    },
    successWithMessageAndResultResponse: (msg,result)=>{
        return {
            status: "success", 
            status_code: 200,
            result: result,
            message: msg
        }
    },
    
    failedWithMessageResponse: (ec, msg)=>{
        return {
            status: "failed", 
            status_code: ec,
            message: msg
        }
    },
    
    clientAuthFailedResponse: {
        status: "failed", 
        message: "Unauthorized Client", 
        status_code: 401
    }

}