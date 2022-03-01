const { getAttendanceGuruDB } = require("../models/attendance_db")

module.exports = {
    attendController: (req,res)=>{
        res.send({
            status: "success", 
            status_code: 200
        })
    },
    // get for guru roles
    getAttendanceGuruController: (req, res)=>{
        const data = req.body
        getAttendanceGuruDB(data.guru_id).then((result)=>{
            res.send({
                status: "success", 
                status_code: 200,
                result: result.rows
            })
        })
    },
    // get for siswa roles
    getAttendanceSiswaController: (req, res)=>{
        
    }
}