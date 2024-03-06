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

  const senMsg = (e: FormEvent) => {
    e.preventDefault()
    socket.emit("message", message, room)
    setMsg("")
  }
  const joinRoom = (e: FormEvent) => {
    e.preventDefault()
    socket.emit("joinRoom", room)
  }
  return (
    <>
      <form className="max-w-sm mx-auto mt-8">
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => { setMsg(e.target.value) }}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your message"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="room" className="block text-sm font-medium text-gray-700">room</label>
          <input
            type="text"
            id="room"
            value={room}
            onChange={(e) => { setRoom(e.target.value) }}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your message"
          />
        </div>
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={senMsg}>
          Send
        </button>
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={joinRoom}>
          join
        </button>
      </form>
      <div>
        {inbox.map((msg: string) =>
          <div>{msg}</div>
        )}
      </div>

    </>)
}
