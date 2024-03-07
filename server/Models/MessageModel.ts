import mongoose from "mongoose";

interface Message {
    content: string,
    sender: string,
    username: mongoose.ObjectId
}

const MessageModel = new mongoose.Schema<Message>({
    content: {
        type: String,
    },
    sender: {
        type: String,
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Message = mongoose.model("Message", MessageModel);

export default Message;