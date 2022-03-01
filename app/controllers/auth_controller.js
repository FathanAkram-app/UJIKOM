const { clientAuthentication, auth, checkRequirements } = require('../helpers/helper');
const bcrypt = require('bcrypt');
const { registerDB, logoutDB, updateTokenDB, findUserByUsernameDB } = require('../models/auth_db');
module.exports = {
    loginController : (req, res) =>{
        // '{"serverkey":"B1smill4hUJIKOM","username":"fathan1","password":"123123"}'

        require('crypto').randomBytes(48, function(err, buffer) {
            const token = buffer.toString('hex');
            
            if(clientAuthentication(req)){
                console.log(auth(req))
                findUserByUsernameDB(auth(req).username).then(data =>{
                    if (data.rows.length == 0) {
                        console.log("no user found")
                        res.send({
                            status: "failed", 
                            message: "Username/Password is wrong", 
                            status_code: 400
                        })
                    }else{
                        bcrypt.compare(auth(req).password, data.rows[0].password, function(err, result) {
                            if (result){
                                console.log("success login")
                                updateTokenDB(auth(req).username, token)
                                res.send({
                                    status: "success", 
                                    message: "successfully logged in", 
                                    status_code: 200, token: token
                                })
                            }else{
                                console.log("password wrong")
                                res.send({
                                    status: "failed", 
                                    message: "Username/Password is wrong", 
                                    status_code: 400
                                })
                            }
                        });
                        

                    }

                })
            }else{
                res.send({
                    status: "failed", 
                    message: "Unauthorized Client", 
                    status_code: 401
                })
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
                        registerDB(userData).then(()=>{
                            res.send({status: "success", status_code: 200})
                        })
                    } else{
                        res.send({
                            status: "failed", 
                            message: "requirements not satisfied", 
                            status_code: 401
                        })
                    }
                    
                    
                });
            });
        }else{
            res.send({
                status: "failed", 
                message: "Unauthorized Client", 
                status_code: 401
            })
        }
    },
    logoutController : (req, res) => {
        // '{"serverkey":"B1smill4hUJIKOM","token":"abcd123123"}'
        if(clientAuthentication(req)){
            logoutDB(auth(req).token).then((data)=>{
                if (data.rowCount > 0){
                    res.send({status: "success",message: "logged out successfully", status_code: 200})
                }else{
                    res.send({status: "failed",message: "session not found or user has already logged out", status_code: 400})
                }
                
            })
        }else{
            res.send({
                status: "failed", 
                message: "Unauthorized Client", 
                status_code: 401
            })
        }
    }
}

