import mongoose from "mongoose";

const nutritionPlanSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    action: String,
    hour: String,
    ingredients: String,
    babyId: String,
    expoPushToken: String,
    motherId: String,
    pediatricianId: String,
});

const nutritionPlanModel = mongoose.model('nutritionPlan', nutritionPlanSchema);

export default nutritionPlanModel;
