const { getAttendanceGuruController, getAttendanceSiswaController, attendController } = require("./controllers/attendance_controller")
const { loginController, registerController, logoutController } = require("./controllers/auth_controller")
const { addCommentController, getCommentController } = require("./controllers/comments_controller")
const { addPelajaranController, getPelajaranController } = require("./controllers/pelajaran_controller")


module.exports = {
    initAuthRoutes: (app)=>{
        app.get('/login', (req, res) => {
            res.sendFile(__dirname+'/views/login.html')
        })
        app.get('/dashboard', (req, res) => {
            res.sendFile(__dirname+'/views/dashboard.html')
        })
        // Auth
        app.post('/api/login', loginController)
        app.post('/api/register', registerController)
        app.post('/api/logout', logoutController)

        // Pelajaran
        app.post('/api/addpelajaran', addPelajaranController)
        app.get('/api/getpelajaran',getPelajaranController)

        // Attendance
        app.post('/api/getattendanceguru', getAttendanceGuruController)
        app.post('/api/getattendancesiswa', getAttendanceSiswaController)
        app.post('/api/attend', attendController)

        // Comments
        app.post('/api/addcomment',addCommentController)
        app.get('/api/getcomment', getCommentController)
    }
}
