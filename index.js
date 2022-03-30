const express = require('express')
const cors=require("cors");
require('dotenv').config()

const app = express()
const port = process.env.PORT
const bodyParser = require('body-parser')


const http = require('http');
// var httpProxy = require('http-proxy');
// var targetHost = '180.252.92.100';
// var port = 8489;
// httpProxy.createProxyServer({target:'http://' + targetHost + ':' + port}).listen(port);
const { initAuthRoutes } = require('./app/routes')
const server = http.createServer(app);
app.use(express.static(__dirname+'/public'));

const { Server } = require("socket.io");
const { initSocketConnection } = require('./app/socket_connections');
const io = new Server(server);


app.use(bodyParser.json())
const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

require('./app/routes')
initAuthRoutes(app)

initSocketConnection(io)

server.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

