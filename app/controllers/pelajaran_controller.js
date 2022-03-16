const { clientAuthentication } = require("../helpers/helper")
const { getPelajaranDB, addPelajaranDB, getPelajaranByKelasDB } = require("../models/pelajaran_db")
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
    getPelajaranByKelasController: (req, res)=>{
        getPelajaranByKelasDB(req.query.kelas).then((result)=>{
            res.send(successWithResultResponse(result.rows))
        })
        
    },
    getPelajaranController: (req, res)=>{
        getPelajaranDB().then((result)=>{
            res.send(successWithResultResponse(result.rows))
        })
        
    }
}