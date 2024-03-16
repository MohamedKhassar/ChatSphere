"use client"
import axios from 'axios'
import { SendHorizontal } from 'lucide-react'
import React, { FormEvent, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
type User = {
    _id: string
    username: string
}
type Message = {
    _id: string
    sender: {
        _id: string
        username: string
    }
    content: string
}
const socket = io("http://localhost:3001")

const Chat = ({ user }: { user: User }) => {
    const [inbox, setInbox] = useState<Message[]>([])
    const [message, setMsg] = useState<string>()
    useEffect(() => {
        const getMsg = async () => {
            try {
                const res = await axios.get("http://localhost:3001/api/")
                const data = res.data
                console.log(data)
                setInbox(data)
            } catch (error) {
                console.log(error)
            }
        }
        getMsg()
        socket.on("message", (msg) => {
            setInbox(prv => [...prv, msg])
        })
    }, [])
    const sendMsg = (e: FormEvent) => {
        e.preventDefault()
        const socket = io("http://localhost:3001")
        if (message) {
            socket.emit("message", message, user?._id)
            setMsg("")
        }
    }
    return (
        <div className='flex justify-center items-center h-screen flex-col'>
            <div className='grid gap-y-8 overflow-scroll h-1/2 w-full backdrop-blur-sm p-5 rounded-md bg-black/5' style={{ scrollbarWidth: "none" }}>
                {inbox && inbox.map(i =>
                    <div className={`${i.sender._id == user?._id ? "float-end bg-green-900 text-white" : "bg-slate-900 text-white"} p-3 rounded-md flex flex-col gap-y-3 h-fit`}>
                        <h1 className='text-sky-500'>{user.username == i.sender.username ? "me" : i.sender.username}</h1>
                        <p className='text-wrap'>{i.content}</p>
                    </div>
                )}
            </div>
            <form onSubmit={sendMsg} className='mt-5 flex gap-x-5 items-center justify-center'>
                <input type="text" className='border border-green-800 rounded-md p-1' value={message} placeholder='Type a message' onChange={(e) => { setMsg(e.target.value) }} />
                <button type="submit" className='text-white bg-green-800 px-5 py-2 rounded-md'><SendHorizontal color='' /></button>
            </form>
        </div>
    )
}

export default Chat
