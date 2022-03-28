
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
    getAttendanceByPelajaranDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const select = "hadir.*, users.nama AS nama_siswa"
        const res = await conn.query("SELECT "+select+" FROM hadir INNER JOIN pelajaran ON pelajaran.id = hadir.pelajaran_id INNER JOIN users ON users.id = hadir.siswa_id WHERE pelajaran.id = "+data)
        await conn.end()
        return res
    },
    attendDB: async (data) =>{
        const conn = client()
        await conn.connect()
        const findAttend = await conn.query("SELECT * FROM hadir WHERE pelajaran_id = "+data.pelajaran_id+" AND siswa_id = "+data.siswa_id)
        if (findAttend.rowCount>0) {
            await conn.query("DELETE FROM hadir WHERE pelajaran_id = "+data.pelajaran_id+" AND siswa_id = "+data.siswa_id)
        }
        if (data.status != 0) {
            const collumns = "(pelajaran_id, siswa_id, status, guru_id)"
            const values = "("+data.pelajaran_id+", "+data.siswa_id+", "+data.status+", "+data.guru_id+")"
            const res = await conn.query("INSERT INTO hadir "+collumns+" VALUES "+values)
        }

        // const res = await conn.query("DELETE FROM users WHERE id = "+data.id)
        
        await conn.end()
        return res
    }
}