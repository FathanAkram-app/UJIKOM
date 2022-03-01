
const { client } = require('../helpers/helper')


module.exports = {
    getAttendanceSiswaDB: async (data)=>{
        const conn = client()
        await conn.connect()
        // const select = "*"
        const select = "pelajaran.*, hadir.*, users.nama AS nama_guru"
        const res = await conn.query("SELECT "+select+" FROM hadir INNER JOIN users ON users.id = hadir.guru_id INNER JOIN pelajaran ON pelajaran.id = hadir.pelajaran_id WHERE hadir.siswa_id = "+data.siswa_id+"")
        await conn.end()
        return res
    },
    getAttendanceGuruDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const select = "hadir.*, pelajaran.*, users.nama AS nama_siswa"
        const res = await conn.query("SELECT "+select+" FROM hadir INNER JOIN pelajaran ON pelajaran.guru_id = hadir.guru_id INNER JOIN users ON users.id = hadir.siswa_id WHERE pelajaran.guru_id = "+data+"")
        await conn.end()
        return res
    },
}