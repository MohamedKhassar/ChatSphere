"use client"
import { FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [message, setMsg] = useState<any>(undefined)
  const [room, setRoom] = useState<any>("room")
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
    socket.emit("joinRoom", room)
  }
  return (
    <div className="flex-col gap-y-8 flex justify-center items-center">
      <h2 className="text-5xl">ChatSphere </h2>
      <form action="">
        <div className="">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" className="p-1 outline-none rounded-md border border-gray-700" />
        </div>
        <button className="p-2 bg-violet-800 hover:bg-violet-900 rounded-md" onClick={joinRoom}>join</button>
      </form>
    </div>
  )
}
