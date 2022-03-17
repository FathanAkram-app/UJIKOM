const { clientAuthentication, auth } = require("../helpers/helper")
const { getUsersDB, loginAdminDB } = require("../models/admin_db")
const { clientAuthFailedResponse, successWithResultResponse, failedWithMessageResponse, successWithMessageResponse, successWithMessageAndResultResponse } = require("../views/json_responses/response")
const bcrypt = require('bcrypt');
const { updateTokenDB } = require("../models/auth_db");
module.exports = {
    getUsersController: (req,res)=>{
        try {
            if(clientAuthentication(req)){
                
                getUsersDB(req.body.keywords, req.body.token).then((result)=>{
                    if (typeof result != "number") {
                        res.send(successWithResultResponse(result))
                    }else{
                        throw 404
                    }
                    
                })
            }else{
                throw 401
            }
        } catch (error) {
            switch (error) {
                case 401:
                    res.send(clientAuthFailedResponse)
                    break;
                case 404:
                    res.send(failedWithMessageResponse(404,"user not found"))
                default:
                    res.send(failedWithMessageResponse(400,"something went wrong"))
                    break;
            }
            
        }
        
    },
    loginAdminController: (req,res)=>{
        const data = auth(req)
        require('crypto').randomBytes(48, function(_, buffer) {
            const token = buffer.toString('hex');
            try {
                if(clientAuthentication(req)){
                    
                    loginAdminDB(data.username).then((result)=>{
                        if (typeof result != "number") {
                            bcrypt.compare(auth(req).password, result.rows[0].password, function(err, pass) {
                                if (err) {
                                    throw 400
                                }else{
                                    if (pass) {
                                        updateTokenDB(data.username, token).then(()=>{
                                            const user = result.rows[0]
                                            user.token = token
                                            res.send(successWithMessageAndResultResponse("successfully logged-in", user))
                                        })
                                        
                                    }else{
                                        res.send(failedWithMessageResponse(404,"password/username wrong"))
                                    }
                                }
                                
                            })

                        }else{
                            res.send(failedWithMessageResponse(404,"password/username wrong"))
                        }
                    })
                }else{
                    throw 401
                }
            } catch (error) {
                switch (error) {
                    case 401:
                        res.send(clientAuthFailedResponse)
                        break;
                    case 404:
                        res.send(failedWithMessageResponse(404,"user not found"))
                    default:
                        res.send(failedWithMessageResponse("something went wrong"))
                        break;
                }
                
            }
        })
        
        

    }
}