import mongoose from "mongoose";

interface User {
    username: string,
    socket_id: string
}

const UserModel = new mongoose.Schema<User>({
    username: {
        type: String,
    },
    socket_id: {
        type: String,
    }
})

const User = mongoose.model("User", UserModel);

export default User;