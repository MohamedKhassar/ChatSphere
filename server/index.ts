import express from "express"
import { Server } from "socket.io"
import http from "http"
import Message from "./Models/MessageModel"
import "./connection/DB"
import User from "./Models/UserModel"
const app = express()


const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    socket.on("connected", async (): Promise<void> => {
        const { id } = socket
        const user = await User.findOne({ socket_id: id })
        socket.emit("connected", user)
    })
    socket.on("createUser", async (username) => {
        const { id } = socket
        await User.create({ username, socket_id: id })
        console.log("created")
    })
    socket.on("disconnect", async () => {
        const { id } = socket
        await User.deleteOne({ socket_id: id })
        console.log("user disconnected")
    })
    socket.on("message", async (data, room): Promise<any> => {
        if (room.length) {
            data && io.to(room).emit("message", data)
            data && await Message.create({ content: data })
            console.log("sending " + data + " to room " + room)
        } else {
            console.log("please join the room first!")
        }
    })
    socket.on("joinRoom", async (data, user) => {
        console.log(socket.id)
        user && socket.join(data)
    })
})

server.listen(3001, () => {
    console.log("Server running on port 3001")
})