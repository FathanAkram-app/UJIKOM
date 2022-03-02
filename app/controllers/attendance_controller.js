const { clientAuthentication } = require("../helpers/helper")
const { getAttendanceGuruDB, getAttendanceSiswaDB, attendDB } = require("../models/attendance_db")

module.exports = {
    attendController: (req,res)=>{
        const data = req.body
        if(clientAuthentication(req)){
            
            attendDB(data).then((result)=>{
                res.send({
                    status: "success", 
                    status_code: 200
                })
            })
        }else{
            res.send({
                status: "failed", 
                message: "Unauthorized Client", 
                status_code: 401
            })
        }    
    },
    // get for guru roles
    getAttendanceGuruController: (req, res)=>{
        const data = req.body
        
        if(clientAuthentication(req)){
            getAttendanceGuruDB(data.guru_id).then((result)=>{
                res.send({
                    status: "success", 
                    status_code: 200,
                    result: result.rows
                })
            })
        }else{
            res.send({
                status: "failed", 
                message: "Unauthorized Client", 
                status_code: 401
            })
        }
    },
    // get for siswa roles
    getAttendanceSiswaController: (req, res)=>{
        const data = req.body
        if(clientAuthentication(req)){
            getAttendanceSiswaDB(data).then((result)=>{
                
                res.send({
                    status: "success", 
                    status_code: 200,
                    result: result.rows
                })
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