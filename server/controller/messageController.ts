import { Request, Response } from "express"
import Message from "../Models/MessageModel"

export const getMessages = async (req: Request, res: Response) => {
    const messages = await Message.find().populate("sender")
    console.log(messages)
    res.json(messages)
}