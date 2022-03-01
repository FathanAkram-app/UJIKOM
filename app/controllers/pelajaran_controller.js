const { clientAuthentication } = require("../helpers/helper")
const { getPelajaranDB, addPelajaranDB } = require("../models/pelajaran_db")

module.exports = {
    addPelajaranController: (req, res)=>{
        const body = req.body
        if(clientAuthentication(req)){
            addPelajaranDB(body).then((data)=>{
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
    getPelajaranController: (req, res)=>{ 
        getPelajaranDB(req.body.search).then((data)=>{
            res.send({
                status: "success", 
                status_code: 200,
                result: data.rows
    
            })
        })
        
    }
}