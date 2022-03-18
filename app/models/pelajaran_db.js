const { client } = require('../helpers/helper')


module.exports = {
    addPelajaranDB: async (data)=>{
        console.log(data.nama+"', '"+data.kelas+"', '"+data.guru_id+"', '"+data.waktu+"', '"+data.materi)
        const conn = client()
        await conn.connect()
        const res = await conn.query("INSERT INTO pelajaran (nama, kelas, guru_id, waktu, materi) VALUES ('"+data.nama+"', '"+data.kelas+"', '"+data.guru_id+"', '"+data.waktu+"', '"+data.materi+"')")
        await conn.end()
        return res
    },

    getPelajaranByKelasDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const usersArray = "ARRAY(SELECT id FROM users WHERE kelas = '"+data+"') AS id_siswa, ARRAY(SELECT nama FROM users WHERE kelas = '"+data+"') AS nama_siswa"
        const res = await conn.query("SELECT pelajaran.*, users.nama AS nama_guru, "+usersArray+" FROM pelajaran INNER JOIN users ON pelajaran.guru_id = users.id WHERE pelajaran.kelas = '"+data+"'")
        
        await conn.end()
        return res
    },
    getPelajaranByGuruIdDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const usersArray = "ARRAY(SELECT id FROM users WHERE kelas = pelajaran.kelas) AS id_siswa, ARRAY(SELECT nama FROM users WHERE kelas = pelajaran.kelas) AS nama_siswa"
        const res = await conn.query("SELECT pelajaran.*, users.nama AS nama_guru, "+usersArray+" FROM pelajaran INNER JOIN users ON pelajaran.guru_id = users.id WHERE pelajaran.guru_id = '"+data+"'")
        for (const key in res.rows) {
            const a = res.rows[key].id_siswa
            
            const arr = []
            for (const i in a) {
                arr.push({id_siswa: res.rows[key].id_siswa[i], nama_siswa: res.rows[key].nama_siswa[i]})
            }
            res.rows[key].siswa = arr
            delete res.rows[key].id_siswa
            delete res.rows[key].nama_siswa
            
        }
        
        await conn.end()
        return res
    },
    getPelajaranDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const res = await conn.query("SELECT pelajaran.*, users.nama AS nama_guru FROM pelajaran INNER JOIN users ON pelajaran.guru_id = users.id WHERE (pelajaran.nama LIKE '%"+data+"%') OR (pelajaran.kelas LIKE '%"+data+"%') OR (users.nama LIKE '%"+data+"%')")
        
        await conn.end()
        return res
    },
    deletePelajaranDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const res = await conn.query("DELETE FROM pelajaran WHERE id = "+data)
        
        await conn.end()
        return res
    }
}