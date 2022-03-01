
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
        await conn.end()

    },
    registerDB: async (data) =>{

        const conn = client()
        await conn.connect()
        await conn.query("INSERT INTO users (username, password, email) VALUES ('"+data.username+"', '"+data.password+"', '"+data.email+"');")
        await conn.end()
    },
    logoutDB: async (token) => {
        const conn = client()
        await conn.connect()
        const res = await conn.query("UPDATE users SET token = NULL WHERE token = '"+token+"';")
        await conn.end()
        return res
    }
}