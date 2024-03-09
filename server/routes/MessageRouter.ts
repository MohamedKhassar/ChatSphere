import { Router } from "express";
import { getMessages } from "../controller/messageController";

const messageRouter = Router()

messageRouter.get("/", getMessages)

export default messageRouter