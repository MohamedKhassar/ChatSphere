import express from "express"
import { Server } from "socket.io"
import http from "http"
import Message from "./Models/MessageModel"
import "./connection/DB"
import User from "./Models/UserModel"
import messageRouter from "./routes/MessageRouter"
import cors from "cors"
const app = express()
app.use(cors())
app.use("/api", messageRouter)


const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})


io.on("connection", (socket) => {
    console.log("user connected")
    socket.on("disconnect", async () => {
        console.log("user disconnected")
    })
    socket.on("message", async (data, sender): Promise<void> => {
        console.log(data, sender);
        if (data) {
            const msg = await Message.create({ content: data, sender })
            const messages = await Message.findById(msg._id).populate("sender")
            io.emit("message", messages)
        }
    })
    socket.on("joinRoom", async (user) => {
        const isUser = await User.findOne({ username: user })
        const newUser = !isUser ? await User.create({ username: user, socket_id: socket.id }) : isUser
        socket.emit("joinRoom", newUser)
    })
})

server.listen(3001, () => {
    console.log("Server running on port 3001")
})