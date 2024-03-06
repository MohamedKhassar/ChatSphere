"use client"
import { FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [message, setMsg] = useState<any>()
  const [inbox, setInbox] = useState<any[]>([])
  const socket = io("http://localhost:3001")
  const senMsg = (e: FormEvent) => {
    e.preventDefault()
    message && socket.emit("message", message)
    setMsg("")
  }
  useEffect(() => {
    socket.on("message", (data) => {
      setInbox([...inbox, data])
    })
  }, [])
  return (
    <>
      <form onSubmit={senMsg} className="max-w-sm mx-auto mt-8">
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
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Send
        </button>
      </form>
      <div>
        s
        {inbox.map((msg, index) =>
          <li key={index}>{msg}</li>
        )}
      </div>

    </>)
}
