const { getAttendanceGuruController } = require("./controllers/attendance_controller")
const { loginController, registerController, logoutController } = require("./controllers/auth_controller")
const { addPelajaranController, getPelajaranController } = require("./controllers/pelajaran_controller")


module.exports = {
    initAuthRoutes: (app)=>{
        app.get('/', (req, res) => {
            res.sendFile(__dirname+'/views/login.html')
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
    }
}
