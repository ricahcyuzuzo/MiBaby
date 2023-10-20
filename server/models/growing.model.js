import mongoose from "mongoose";

const growingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    weight: String,
    height: String,
    month: String,
    mother: String,
    baby: String,
    createdAt: String,
});

const GrowingModel = mongoose.model("growing", growingSchema);

export default GrowingModel;
