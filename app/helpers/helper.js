const { Client } = require('pg')
const version = require('../../package.json')

module.exports = {
    checkRequirements : (data) => {
        let checkUsername = ()=>{
            if (data["username"] != null) {
                const a = data["username"].search(/\s/g) < 0;  
                if (!a) {
                    console.log("username invalid")
                }
                return a
            }else{
                return true
            }
        }
        let checkEmail = () => {
            if (data["email"] != null) {
                const a = data["email"].search("@") > 0 && data["email"].search(/\s/g) < 0;
                if (!a) {
                    console.log("email invalid")
                }
                return a
            }else{
                return true
            }
        }
        let checkPassword = ()=>{
            if (data["password"] != null) {
                
                const a = data["password"].search(/\s/g) < 0 && data["password"].match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) != null;   
                if (!a) {
                    console.log(data["password"])
                    console.log("password invalid")
                }
                return a
            }else{
                return true
            }
        }

        return checkUsername() && checkEmail() && checkPassword()
    },
    checkReservationItem: (data) => {
        return data["name"] != null && data["description"] != null && data["category"] != null && data["name"] != null && data["location"] != null && data["storeid"] != null
        
    },
    client : () => {
        return new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'ujikom',
            password: '123',
            port: 5432,
        })
    },
    clientAuthentication : (req)=>{
        return JSON.parse(Buffer.from(req.headers.authorization, 'base64').toString('ascii')).serverkey == version["serverkey"]
    },
    auth: (req)=>{
        return JSON.parse(Buffer.from(req.headers.authorization, 'base64').toString('ascii'))
    }
    
}