"use client"
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Chat from "./chat/page";

export default function Home() {
  const [userConnected, setUserConnected] = useState<any>({})
  const [user, setUser] = useState("")
  const [chat, setC] = useState(false)
  const socket = io("http://localhost:3001")
  const joinRoom = (e: FormEvent) => {
    e.preventDefault()
    if (user) {
      socket.emit("joinRoom", user)
      socket.on("joinRoom", (user) => {
        setUserConnected(user)
        setC(true)
      })
    }
  }
  return (
    <div className="bg-[url(/img/bg.jpg)] flex-col gap-y-8 flex justify-center items-center h-screen">
      {chat ? <Chat user={userConnected} /> : <div className="flex-col gap-y-5 w-96 flex justify-center items-center  bg-black/10 backdrop-blur-sm p-6 rounded-md shadow-lg h-96">
        <h2 className="text-5xl font-bold">ChatSphere </h2>
        <form onSubmit={joinRoom} className="grid gap-y-5">
          <div className="grid grid-cols-1 gap-y-3">
            <label htmlFor="name" className="font-semibold" >Name:</label>
            <input type="text" id="name" className="p-1 outline-none rounded-md border border-gray-700" onChange={(e) => setUser(e.target.value)} />
          </div>
          <button className="p-2 duration-300 font-semibold capitalize bg-violet-800 hover:bg-violet-900 rounded-md" type="submit">join</button>
        </form>
      </div>
      }
    </div>
  )
}
