
const { client } = require('../helpers/helper')


module.exports = {
    getAttendanceSiswaDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const res = await conn.query("SELECT * FROM hadir WHERE user_id LIKE '%"+data+"%'")
        await conn.end()
        return res
    },
    getAttendanceGuruDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const select = "hadir.*, pelajaran.*, users.nama AS nama_siswa"
        const res = await conn.query("SELECT "+select+" FROM hadir INNER JOIN pelajaran ON pelajaran.guru_id = hadir.guru_id INNER JOIN users ON users.id = hadir.user_id WHERE pelajaran.guru_id = "+data+"")
        await conn.end()
        return res
    },
}