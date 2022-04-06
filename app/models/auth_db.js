
const res = require('express/lib/response')
const { client } = require('../helpers/helper')


module.exports = {
    findUserByUsernameDB: async (username)=>{
        const conn = client()
        await conn.connect()
        
        const res = await conn.query("SELECT * FROM users WHERE username = '"+username+"'")
        
        await conn.end()
        return res
    },
    updateTokenDB: async (username, token) =>{
        const conn = client()
        await conn.connect()
        await conn.query("UPDATE users SET token = '"+token+"' WHERE username = '"+username+"'")
        const res = await conn.query("SELECT * FROM users WHERE token = '"+token+"'")
        await conn.end()
        return res

    },
    registerDB: async (data) =>{

        const conn = client()
        await conn.connect()
        try {
            await conn.query("INSERT INTO users (username, password, email, nama,kelas) VALUES ('"+data.username+"', '"+data.password+"', '"+data.email+"', '"+data.nama+"',  '"+data.kelas+"');")
        } catch (error) {
            await conn.end()
            return error
        }
        
        await conn.end()
        return null
    },
    logoutDB: async (token) => {
        const conn = client()
        await conn.connect()
        await conn.query("UPDATE users SET token = NULL WHERE token = '"+token+"';")
        

        await conn.end()
        return res
    }
}