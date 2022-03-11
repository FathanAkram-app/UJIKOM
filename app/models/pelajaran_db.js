const { client } = require('../helpers/helper')


module.exports = {
    addPelajaranDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const res = await conn.query("INSERT INTO pelajaran (nama, kelas, guru_id, waktu, materi) VALUES ('"+data.nama+"', '"+data.kelas+"', '"+data.guru_id+"', '"+data.waktu+"', '"+data.materi+"')")
        await conn.end()
        return res
    },

    getPelajaranDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const res = await conn.query("SELECT * FROM pelajaran WHERE kelas = '"+data+"'")
        await conn.end()
        return res
    }
}