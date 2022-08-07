import express from 'express'
import morgan from 'morgan'
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

import { Port } from "./config.js";
import eventsIO from './socket.js'

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const httpServer = http.createServer(app)
const io = new SocketServer(httpServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
})
eventsIO(io)

// settings
app.set('port', Port)

// middelwares
app.use(cors())
app.use(morgan('dev'))

// static files
app.use(express.static(path.join(__dirname, '../client/build')))

httpServer.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})