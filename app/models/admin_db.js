const { client } = require("../helpers/helper")

module.exports = {
    getUsersDB: async (data, token)=>{
        const conn = client()
        await conn.connect()
        try {
            const findUser = await conn.query("SELECT * FROM users WHERE token = '"+token+"'")
            if (findUser.rowCount > 0 && findUser.rows[0].roles == 4) {
                const res = await conn.query("SELECT * FROM users WHERE (users.username LIKE '%"+data+"%') OR (users.email LIKE '%"+data+"%') OR (users.nama LIKE '%"+data+"%') OR (users.kelas LIKE '%"+data+"%')")
                await conn.end()
                return res
            }else{
                throw 404
            }
        } catch (error) {
            return error
        }
        
        
        
    },
    loginAdminDB: async (username)=>{
        const conn = client()
        await conn.connect()
        try {
            const findUser = await conn.query("SELECT * FROM users WHERE username = '"+username+"'")
            if (findUser.rows.length > 0 && findUser.rows[0].roles == 4) {
                return findUser
            }else{
                throw 404
            }
        } catch (error) {
            return error
        }
        
    }
}