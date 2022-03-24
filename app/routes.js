const { loginAdminController, getUsersController, addPelajaranController, deletePelajaranController, deleteUserController, editPelajaranController, editUserController } = require("./controllers/admin_controller")
const { getAttendanceGuruController, getAttendanceSiswaController, attendController, getAttendanceByKelasController, getAttendanceByPelajaranController } = require("./controllers/attendance_controller")
const { loginController, registerController, logoutController } = require("./controllers/auth_controller")
const { addCommentController, getCommentController } = require("./controllers/comments_controller")
const { getPelajaranController, getPelajaranByKelasController, getPelajaranByGuruIdController } = require("./controllers/pelajaran_controller")


module.exports = {
    initAuthRoutes: (app)=>{
        app.get('/', (req, res) => {
            res.sendFile(__dirname+'/build/index.html')
        })
        // Auth
        app.post('/api/login', loginController)
        app.post('/api/register', registerController)
        app.post('/api/logout', logoutController)

        // Pelajaran
        app.post('/api/addpelajaran', addPelajaranController)
        app.get('/api/getpelajaranbykelas',getPelajaranByKelasController)
        app.get('/api/getpelajaranbyguruid',getPelajaranByGuruIdController)
        app.get('/api/getpelajaran',getPelajaranController)
        app.post('/api/deletepelajaran',deletePelajaranController)

        // Attendance
        app.post('/api/getattendanceguru', getAttendanceGuruController)
        app.post('/api/getattendancesiswa', getAttendanceSiswaController)
        app.post('/api/getattendancekelas', getAttendanceByPelajaranController)
        app.post('/api/attend', attendController)

        // Comments
        app.post('/api/addcomment',addCommentController)
        app.get('/api/getcomment', getCommentController)

        //Admin
        app.post('/api/admin/login', loginAdminController)
        app.post('/api/admin/getusers', getUsersController)
        app.post('/api/admin/deleteuser', deleteUserController)
        app.post('/api/admin/editUser', editUserController)
        app.post('/api/admin/editPelajaran', editPelajaranController)


        
    }
}
