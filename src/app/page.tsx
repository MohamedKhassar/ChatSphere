"use client"
import { FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [user, setUser] = useState<any>(undefined)
  const [inbox, setInbox] = useState<any[]>([])
  const socket = io("http://localhost:3001")

  useEffect(() => {
    socket.on('message', (msg: string) => {
      setInbox((prevChat) => [...prevChat, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  // const senMsg = (e: FormEvent) => {
  //   e.preventDefault()
  //   socket.emit("message", message, room)
  //   setMsg("")
  // }
  const joinRoom = (e: FormEvent) => {
    e.preventDefault()
    socket.emit("joinRoom", "room", user)
  }
  return (
    <div className="bg-[url(/img/bg.jpg)] flex-col gap-y-8 flex justify-center items-center h-screen">
      <div className="flex-col gap-y-5 w-96 flex justify-center items-center  bg-black/10 backdrop-blur-sm p-6 rounded-md shadow-lg h-96">
        <h2 className="text-5xl font-bold">ChatSphere </h2>
        <form action="" className="grid gap-y-5">
          <div className="grid grid-cols-1 gap-y-3">
            <label htmlFor="name" className="font-semibold" >Name:</label>
            <input type="text" id="name" className="p-1 outline-none rounded-md border border-gray-700" onChange={(e) => setUser(e.target.value)} />
          </div>
          <button className="p-2 duration-300 font-semibold capitalize bg-violet-800 hover:bg-violet-900 rounded-md" onClick={joinRoom}>join</button>
        </form>
      </div>
    </div>
  )
}
