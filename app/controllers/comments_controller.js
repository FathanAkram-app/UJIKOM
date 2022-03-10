const { clientAuthentication } = require("../helpers/helper")
const { addCommentDB, getCommentDB } = require("../models/comments_db")
const { clientAuthFailedResponse, failedWithMessageResponse, successWithMessageResponse, successWithMessageAndResultResponse } = require("../views/json_responses/response")

module.exports = {
    addCommentController : (req, res)=>{
        if(clientAuthentication(req)){
            addCommentDB(req.body).then((data)=>{
                if (data == null) {
                    res.send(successWithMessageResponse("successfully added a comment"))
                }else{
                    res.send(failedWithMessageResponse(400,"oops, looks like you did something wrong"))
                }
            })
        }else{
            res.send(clientAuthFailedResponse)
        }
    },
    getCommentController : (req, res)=>{
        getCommentDB(req.body).then((data)=>{
            res.send(successWithMessageAndResultResponse("successfully added a comment",data.rows))
        })
    }
}