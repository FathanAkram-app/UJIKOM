const { clientAuthentication } = require("../helpers/helper")
const { getPelajaranDB, addPelajaranDB } = require("../models/pelajaran_db")
const { successWithMessageResponse, clientAuthFailedResponse, successWithResultResponse } = require("../views/json_responses/response")

module.exports = {
    addPelajaranController: (req, res)=>{
        const body = req.body
        if(clientAuthentication(req)){
            addPelajaranDB(body).then((data)=>{
                res.send(successWithMessageResponse("successfully added a pelajaran"))
            })
        }else{
            res.send(clientAuthFailedResponse)
        }
    },
    getPelajaranController: (req, res)=>{ 
        getPelajaranDB(req.body.search).then((result)=>{
            res.send(successWithResultResponse(result.rows))
        })
        
    }
}