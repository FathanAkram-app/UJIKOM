const express = require('express')

const app = express()
const port = 3000
const bodyParser = require('body-parser')


const http = require('http');
const { initAuthRoutes } = require('./app/routes')
const server = http.createServer(app);


app.use(bodyParser.json())

require('./app/routes')
initAuthRoutes(app)

server.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })