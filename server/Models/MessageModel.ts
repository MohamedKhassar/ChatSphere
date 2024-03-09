import mongoose from "mongoose";

interface Message {
    content: string,
    sender: string
}

const MessageModel = new mongoose.Schema<Message>({
    content: {
        type: String,
    },
    sender: {
        type: String,
        ref: "User"
    }
})

const Message = mongoose.model("Message", MessageModel);

export default Message;