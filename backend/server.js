import express from "express"
import http from "http"
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: { origin: "*" }
})

app.use(express.json())

let motoboys = {}

io.on("connection", (socket) => {

  socket.on("location_update", (data) => {

    motoboys[data.id] = data

    io.emit("motoboy_location", data)

  })

})

server.listen(3000)
