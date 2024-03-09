import React from 'react'
import { io } from 'socket.io-client'

const page = () => {
    const { id } = io("http://localhost:3001")
    console.log(id)
    return (
        <div>

        </div>
    )
}

export default page
