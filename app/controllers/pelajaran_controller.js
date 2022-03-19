const { clientAuthentication } = require("../helpers/helper")
const { addPelajaranDB, deletePelajaranDB } = require("../models/admin_db")
const { getPelajaranDB, getPelajaranByKelasDB, getPelajaranByGuruIdDB } = require("../models/pelajaran_db")
const { successWithMessageResponse, clientAuthFailedResponse, successWithResultResponse } = require("../views/json_responses/response")

module.exports = {
    getPelajaranByKelasController: (req, res)=>{
        getPelajaranByKelasDB(req.query.kelas).then((result)=>{
            res.send(successWithResultResponse(result.rows))
        })
        
    },
    getPelajaranController: (req, res)=>{
        getPelajaranDB(req.query.search).then((result)=>{
            res.send(successWithResultResponse(result.rows))
        })
        
    },
    getPelajaranByGuruIdController: (req,res)=>{
        getPelajaranByGuruIdDB(req.query.guruid).then((result)=>{
            res.send(successWithResultResponse(result.rows))
        })
    }
}