
module.exports = {
    initSocketConnection : io =>{
        io.on("connection", socket => {
            console.log("connection")
            socket.on("login", (siswa_id) => {
                socket.join(siswa_id)
            })
            socket.on("notification", (siswa_id,message) => {
                socket.to(siswa_id).emit("notification",message)
            })
            socket.on("disconnect", ()=>{
                
            })
        })
    }
}