import { Request, Response } from "express"
import Message from "../Models/MessageModel"

export const getMessages = async (req: Request, res: Response) => {
    const messages = await Message.find().populate("sender")
    res.json(messages)
}