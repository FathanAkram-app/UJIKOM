const { clientAuthentication } = require("../helpers/helper")
const { getAttendanceGuruDB, getAttendanceSiswaDB, attendDB, getAttendanceByKelasDB, getAttendanceByPelajaranDB } = require("../models/attendance_db")
const {  successWithMessageResponse, clientAuthFailedResponse, successWithResultResponse } = require("../views/json_responses/response")

module.exports = {
    attendController: (req,res)=>{
        const data = req.body
        if(clientAuthentication(req)){
            
            attendDB(data).then((result)=>{
                res.send(successWithMessageResponse("successfully attended"))
            })
        }else{
            res.send(clientAuthFailedResponse)
        }
    },
    // get for guru roles
    getAttendanceGuruController: (req, res)=>{
        const data = req.body
        
        if(clientAuthentication(req)){
            getAttendanceGuruDB(data.guru_id).then((result)=>{
                res.send(successWithResultResponse(result.rows))
            })
        }else{
            res.send(clientAuthFailedResponse)
        }
    },
    // get for siswa roles
    getAttendanceSiswaController: (req, res)=>{
        const data = req.body
        if(clientAuthentication(req)){
            getAttendanceSiswaDB(data).then((result)=>{
                
                res.send(successWithResultResponse(result.rows))
            })
        }else{
            res.send(clientAuthFailedResponse)
        }
    },
    getAttendanceByPelajaranController: (req, res)=>{
        const data = req.body
        if(clientAuthentication(req)){
            getAttendanceByPelajaranDB(data.pelajaran_id).then((result)=>{
                
                res.send(successWithResultResponse(result.rows))
            })
        }else{
            res.send(clientAuthFailedResponse)
        }
    }
}