const { clientAuthentication, auth } = require("../helpers/helper")
const { getUsersDB, loginAdminDB, deleteUserDB, deletePelajaranDB, addPelajaranDB, editPelajaranDB, editUserDB } = require("../models/admin_db")
const { clientAuthFailedResponse, successWithResultResponse, failedWithMessageResponse, successWithMessageResponse, successWithMessageAndResultResponse } = require("../views/json_responses/response")
const bcrypt = require('bcrypt');
const { updateTokenDB } = require("../models/auth_db");
module.exports = {
    getUsersController: (req,res)=>{
        try {
            if(clientAuthentication(req)){
                
                getUsersDB(req.body).then((result)=>{
                    if (typeof result != "number") {
                        res.send(successWithResultResponse(result.rows))
                    }else{
                        res.send(failedWithMessageResponse(401,"you are not an admin"))
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
        
        

    },

    deleteUserController: (req,res)=>{
        if(clientAuthentication(req)){
                
            deleteUserDB(req.body).then((result)=>{
                if (typeof result != "number") {
                    res.send(successWithMessageResponse("successfully deleted a user"))
                }else{
                    res.send(failedWithMessageResponse(401,"you are not an admin"))
                }
                
            })
        }else{
            res.send(clientAuthFailedResponse)
        }
    },
    deletePelajaranController: (req,res)=>{
        const body = req.body
        if(clientAuthentication(req)){
            deletePelajaranDB(body).then((data)=>{
                if (typeof data != "number") {
                    res.send(successWithMessageResponse("successfully deleted a pelajaran"))
                }else{
                    res.send(failedWithMessageResponse(401,"you are not an admin"))
                }
                
            })
        }else{
            res.send(clientAuthFailedResponse)
        }
    },
    addPelajaranController: (req, res)=>{
        const body = req.body
        if(clientAuthentication(req)){
            addPelajaranDB(body).then((data)=>{
                if (typeof data != "number") {
                    res.send(successWithMessageResponse("successfully added a pelajaran"))
                }else{
                    res.send(failedWithMessageResponse(401,"you are not an admin"))
                }
                
            })
        }else{
            res.send(clientAuthFailedResponse)
        }
    },
    editUserController: (req, res)=>{
        const body = req.body
        if(clientAuthentication(req)){
            editUserDB(body).then((data)=>{
                if (typeof data != "number") {
                    res.send(successWithMessageResponse("successfully edited a user"))
                }else{
                    res.send(failedWithMessageResponse(401,"you are not an admin"))
                }
                
            })
        }else{
            res.send(clientAuthFailedResponse)
        }
    },
    editPelajaranController: (req, res)=>{
        const body = req.body
        if(clientAuthentication(req)){
            editPelajaranDB(body).then((data)=>{
                
                console.log(data)
                if (typeof data != "number") {
                    res.send(successWithMessageResponse("successfully edited a pelajaran"))
                }else{
                    res.send(failedWithMessageResponse(401,"you are not an admin"))
                }
                
            })
        }else{
            res.send(clientAuthFailedResponse)
        }
    }
}