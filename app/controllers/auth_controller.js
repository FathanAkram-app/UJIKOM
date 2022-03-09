const { clientAuthentication, auth, checkRequirements } = require('../helpers/helper');
const bcrypt = require('bcrypt');
const { registerDB, logoutDB, updateTokenDB, findUserByUsernameDB } = require('../models/auth_db');
const { throws } = require('assert');
const { loginFailedResponse, requirementsFailedResponse } = require('../views/json_responses/auth_response');
const { successWithMessageAndResultResponse, clientAuthFailedResponse, successWithMessageResponse, failedWithMessageResponse } = require('../views/json_responses/response');
module.exports = {
    loginController : (req, res) =>{
        // '{"serverkey":"B1smill4hUJIKOM","username":"fathan1","password":"123123"}'

        require('crypto').randomBytes(48, function(err, buffer) {
            const token = buffer.toString('hex');
            
            if(clientAuthentication(req)){
                console.log(auth(req))
                findUserByUsernameDB(auth(req).username).then(data =>{
                    if (data.rows.length == 0) {
                        res.send(loginFailedResponse)
                    }else{
                        bcrypt.compare(auth(req).password, data.rows[0].password, function(err, result) {
                            if (result){
                                updateTokenDB(auth(req).username, token)
                                res.send(successWithMessageAndResultResponse("successfully logged-in", {token: token}))
                            }else{
                                res.send(loginFailedResponse)
                            }
                        });
                        

                    }

                })
            }else{
                res.send(clientAuthFailedResponse)
            }
        });
    },
    registerController : (req, res) => {
        //'{"serverkey":"B1smill4hUJIKOM","username":"fathan1","password":"Fathan123","email": "fathan1@gmail.com", "phone": "082123131"}'
        
        if(clientAuthentication(req)){
            bcrypt.genSalt(10, function(err, salt) {
                const data = auth(req)
                bcrypt.hash(data.password, salt, function(err, hash) {
                    const userData = {
                        username: data.username,
                        password: hash,
                        email: data.email,
                        phone: data.phone
                    }

                    if (checkRequirements(data)) {
                        registerDB(userData).then((result)=>{
                            if (result == null) {
                                res.send(successWithMessageResponse("successfully registered an account"))
                            }else{
                                if (result.detail.search("already exists.")){
                                    res.send(failedWithMessageResponse(400,"username is not available"))
                                }else{
                                    res.send(failedWithMessageResponse(400,"oops, you did something wrong"))
                                }
                                
                            }
                            
                        })
                        
                    } else{
                        res.send(requirementsFailedResponse)
                    }
                    
                    
                });
            });
        }else{
            res.send(clientAuthFailedResponse)
        }
    },
    logoutController : (req, res) => {
        // '{"serverkey":"B1smill4hUJIKOM","token":"abcd123123"}'
        if(clientAuthentication(req)){
            logoutDB(auth(req).token).then((data)=>{
                if (data.rowCount > 0){
                    res.send(successWithMessageResponse("successfully logged-out"))
                }else{
                    res.send(failedWithMessageResponse(400, "session not found or user has already logged out"))
                }
                
            })
        }else{
            res.send(clientAuthFailedResponse)
        }
    }
}

