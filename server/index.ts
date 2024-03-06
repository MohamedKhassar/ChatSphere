import express from "express"
import { Server } from "socket.io"
import http from "http"
import Message from "./Models/MessageModel"
import "./connection/DB"
const app = express()


const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("a user connected")
    socket.on("disconnect", () => {
        console.log("user disconnected")
    })
    socket.on("message", (data, room) => {
        if (room.length) {
            data && io.to(room).emit("message", data)
            console.log("sending " + data + " to room " + room)
        } else {
            console.log("please join the room first!")
        }
    })
    socket.on("joinRoom", (data) => {
        console.log("joining " + data)
        socket.join(data)
    })
})

server.listen(3001, () => {
    console.log("Server running on port 3001")
})