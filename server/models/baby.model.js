import mongoose from "mongoose";

const babySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: String,
    weight: String,
    height: String,
    motherId: String,
    createdAt: String,
    updatedAt: String,
});

const BabyModel = mongoose.model('baby', babySchema);

export default BabyModel;
