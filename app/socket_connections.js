
module.exports = {
    initSocketConnection : io =>{
        io.on("connection", socket => {
            socket.on("login", (siswa_id) => {
                socket.join(siswa_id)
            })
            socket.on("alpha", (siswa_id) => {
                socket.to(siswa_id).emit("peringatan","Peringatan Alpha")
            })
            socket.on("disconnect", ()=>{})
        })
    }
}