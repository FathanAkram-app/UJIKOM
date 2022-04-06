const { client } = require("../helpers/helper")

module.exports = {
    getUsersDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const findUser = await conn.query("SELECT * FROM users WHERE token = '"+data.token+"'")
        if (findUser.rowCount > 0 && findUser.rows[0].roles == 4) {
            const res = await conn.query("SELECT * FROM users WHERE (users.username LIKE '%"+data.search+"%') OR (users.email LIKE '%"+data+"%') OR (users.nama LIKE '%"+data+"%') OR (users.kelas LIKE '%"+data+"%')")
            await conn.end()
            return res
        }else{
            await conn.end()
            return 404
        }
        
        
        
        
    },
    loginAdminDB: async (username)=>{
        const conn = client()
        await conn.connect()
    
        const findUser = await conn.query("SELECT * FROM users WHERE username = '"+username+"'")
        if (findUser.rows.length > 0 && findUser.rows[0].roles == 4) {
            await conn.end()
            return findUser
        }else{
            await conn.end()
            return 404
        }
    
        
    },
    deleteUserDB: async (data)=>{
        const conn = client()
        await conn.connect()
        
        const findUser = await conn.query("SELECT * FROM users WHERE token = '"+data.token+"'")
        if (findUser.rows.length > 0 && findUser.rows[0].roles == 4) {
            const res = await conn.query("DELETE FROM users WHERE id = "+data.id)
            await conn.end()
            return res 
        }else{
            await conn.end()
            return 404
        }
    
        
    },
    addPelajaranDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const findUser = await conn.query("SELECT * FROM users WHERE token = '"+data.token+"'")
        if (findUser.rows.length > 0 && findUser.rows[0].roles == 4) {
            const res = await conn.query("INSERT INTO pelajaran (nama, kelas, guru_id, waktu, materi) VALUES ('"+data.nama+"', '"+data.kelas+"', '"+data.guru_id+"', '"+data.waktu+"', '"+data.materi+"')")
            await conn.end()
            return res
        }else{
            await conn.end()
            return 404
        }
        
        
        
    },
    deletePelajaranDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const findUser = await conn.query("SELECT * FROM users WHERE token = '"+data.token+"'")
        if (findUser.rows.length > 0 && findUser.rows[0].roles == 4) {
            const res = await conn.query("DELETE FROM pelajaran WHERE id = "+data.id)
            await conn.end()
            return res
        }else{
            await conn.end()
            return 404
        }
        
        
        
    },
    editPelajaranDB: async (data)=>{
        const conn = client()
        await conn.connect()
        console.log(data)
        const findUser = await conn.query("SELECT * FROM users WHERE token = '"+data.token+"'")
        if (findUser.rows.length > 0 && findUser.rows[0].roles == 4) {
            const set = "nama = '"+data.nama_pelajaran+"', kelas = '"+data.kelas+"', guru_id = "+data.id_guru+", waktu = '"+data.jampelajaran+"', materi = '"+data.materi+"'"
            const res = await conn.query("UPDATE pelajaran SET "+set+" WHERE id ="+data.id)
            await conn.end()
            return res
        }else{
            await conn.end()
            return 404
        }
    },

    editUserDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const findUser = await conn.query("SELECT * FROM users WHERE token = '"+data.token+"'")
        if (findUser.rows.length > 0 && findUser.rows[0].roles == 4) {
            const set = "username = '"+data.username+"', email = '"+data.email+"', roles = '"+data.roles+"', nama = '"+data.nama+"', kelas = '"+data.kelas+"'"
            const res = await conn.query("UPDATE users SET "+set+" WHERE id ="+data.id)
            await conn.end()
            return res
        }else{
            await conn.end()
            return 404
        }
        
    },

    
}