import Mongoose from 'mongoose';
import nutritionPlanModel from '../models/nutriplan.model';
import jwtDecode from 'jwt-decode';

export const createNutritionPlan = async (req, res) => {
    try {
        const { action, hour, ingredients, babyId, motherId } = req.body;
        const token = req.headers.authorization;
        const decodedToken = jwtDecode(token);
        const pediatricianId = decodedToken.user._id;
        
        const created = await nutritionPlanModel.create({
            _id: new Mongoose.Types.ObjectId(),
            action,
            hour,
            ingredients,
            babyId,
            motherId,
            expoPushToken: '',
            pediatricianId,
        });

        if(created){
            return res.status(201).json({
                message: "Nutrition plan created successfully",
                nutrition: created,
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something wrong happened",
        })
    }
}

export const updatePushToken = async (req, res) => {
    try {
        const { expoPushToken } = req.body;
        const token = req.headers.authorization;
        const decodedToken = jwtDecode(token);
        const updated = await nutritionPlanModel.findOneAndUpdate({ motherId: decodedToken.user._id } , { expoPushToken });
        console.log(updated, 'LLL');
        if(updated){
            return res.status(200).json({
                message: "Updated Successfully"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something wrong happened",
        })
    }
}

export const getNutriByBaby = async (req, res) => {
    try {
        const { baby } = req.query; 
        const nutris = await nutritionPlanModel.find({ babyId: baby });
        return res.status(200).json({
            nutritions: nutris,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something wrong happened",
        })
    }
} 

export const deleteNutrition = async (req, res) => {
    try {
        const { id } = req.query; 
        const nutris = await nutritionPlanModel.findByIdAndDelete(id);
        return res.status(200).json({
            nutritions: nutris,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something wrong happened",
        })
    }
} 

export const getNutriByPediatrician = async (req, res) => {
    try {
        const { pediatricianId } = req.query; 
        const nutris = await nutritionPlanModel.find({ pediatricianId });
        return res.status(200).json({
            nutrition: nutris,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something wrong happened",
        })
    }
} 
