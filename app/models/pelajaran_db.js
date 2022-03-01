const { client } = require('../helpers/helper')


module.exports = {
    addPelajaranDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const res = await conn.query("INSERT INTO pelajaran (nama, kelas, guru_id, waktu) VALUES ('"+data.nama+"', '"+data.kelas+"', '"+data.guruid+"', '"+data.waktu+"')")
        await conn.end()
        return res
    },

    getPelajaranDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const res = await conn.query("SELECT * FROM pelajaran WHERE nama LIKE '%"+data+"%'")
        await conn.end()
        return res
    }
}