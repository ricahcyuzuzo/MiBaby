import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    phone: String,
    password: String,
    type: String,
    createdAt: String,
    updatedAt: String,
});

const UserModel = mongoose.model('Users', userSchema);

export default UserModel;
