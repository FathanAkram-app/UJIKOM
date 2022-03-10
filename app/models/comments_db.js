const { client } = require("../helpers/helper")

module.exports = {
    addCommentDB : async (data)=>{
        const conn = client()
        await conn.connect()
        try {
            const res = await conn.query("INSERT INTO comments (message, user_id, parent_id, pelajaran_id) VALUES ('"+data.message+"', "+data.user_id+", "+data.parent_id+", "+data.pelajaran_id+");")
        } catch (error) {
            await conn.end()
            return error
        }
        await conn.end()
        return null
    },
    getCommentDB: async (data)=>{
        const conn = client()
        await conn.connect()
        const select = "comments.*, users.nama AS nama_siswa, users.id AS user_id"
        const res = await conn.query("SELECT "+select+" FROM comments INNER JOIN users ON comments.user_id = users.id WHERE pelajaran_id = "+data.pelajaran_id+"")
        await conn.end()
        return res
    },
}