const { loginAdminController, getUsersController } = require("./controllers/admin_controller")
const { getAttendanceGuruController, getAttendanceSiswaController, attendController } = require("./controllers/attendance_controller")
const { loginController, registerController, logoutController } = require("./controllers/auth_controller")
const { addCommentController, getCommentController } = require("./controllers/comments_controller")
const { addPelajaranController, getPelajaranController, getPelajaranByKelasController, getPelajaranByGuruIdController, deletePelajaranController } = require("./controllers/pelajaran_controller")


module.exports = {
    initAuthRoutes: (app)=>{
        app.get('/login', (req, res) => {
            res.sendFile(__dirname+'/views/login.html')
        })
        app.get('/dashboard', (req, res) => {
            res.sendFile(__dirname+'/views/dashboard.html')
        })
        app.get('/test',(req, res) =>{
            res.sendFile(__dirname + '/views/test.html')
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
        app.post('/api/attend', attendController)

        // Comments
        app.post('/api/addcomment',addCommentController)
        app.get('/api/getcomment', getCommentController)

        //Admin
        app.post('/api/admin/login', loginAdminController)
        app.post('/api/admin/getusers', getUsersController)


        
    }
}
