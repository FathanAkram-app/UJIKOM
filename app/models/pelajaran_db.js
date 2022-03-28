const { client } = require('../helpers/helper')


module.exports = {
    

    getPelajaranByKelasDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const res = await conn.query("SELECT pelajaran.*, users.nama AS nama_guru, hadir.status FROM pelajaran INNER JOIN users ON pelajaran.guru_id = users.id LEFT JOIN hadir ON hadir.pelajaran_id = pelajaran.id WHERE pelajaran.kelas = '"+data+"' ")


        await conn.end()
        return res
    },
    getPelajaranByGuruIdDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const usersArray = "ARRAY(SELECT id FROM users WHERE kelas = pelajaran.kelas) AS id_siswa, ARRAY(SELECT nama FROM users WHERE kelas = pelajaran.kelas) AS nama_siswa"
        const res = await conn.query("SELECT pelajaran.*, users.nama AS nama_guru, "+usersArray+" FROM pelajaran INNER JOIN users ON pelajaran.guru_id = users.id WHERE pelajaran.guru_id = '"+data+"'")
        const q = await conn.query("SELECT * FROM hadir WHERE hadir.guru_id = '"+data+"'")
        for (const key in res.rows) {
            const a = res.rows[key].id_siswa
            const arr = []
            for (const i in a) {
                if (res.rows[key].guru_id!=a[i]) {
                    const ob = {id_siswa: a[i], nama_siswa: res.rows[key].nama_siswa[i]}
                    for (const k in q.rows) {
                        if(a[i] == q.rows[k].siswa_id && q.rows[k].pelajaran_id == res.rows[key].id){
                            ob["status"] = q.rows[k].status
                        }
                        
                    }
                    arr.push(ob)
                }
                
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
    }
}