import Mongoose from 'mongoose';
import BabyModel from '../models/baby.model';
import jwtDecode from 'jwt-decode';

export const createBaby = async (req, res) => {
    try {
        const { name, age, weight, height, motherId } = req.body;
        
        const babyExists = await BabyModel.findOne({ name, motherId });

        if(babyExists){
            return res.status(403).json({
                message: "Baby already exists with the same name.",
            });
        }

        const createdBaby = await BabyModel.create({
            _id: new Mongoose.Types.ObjectId(),
            name,
            age,
            weight,
            height,
            motherId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        if(createdBaby){
            return res.status(201).json({
                message: "Baby Created successfully",
                baby: createdBaby,
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something wrong happened",
        })
    }
}

export const getBabies = async (req, res) => {
    try {
        const babies = await BabyModel.find();
        return res.status(201).json({
            babies,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something wrong happened",
        })
    }
} 


export const getBabiesMother = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = token ? jwtDecode(token) : null;
        const { mother } = req.query;

        const babies = await BabyModel.find({ motherId: decodedToken?.user?._id ? decodedToken?.user?._id : mother });
        return res.status(201).json({
            babies,
        });
    } catch (error) {
        console.log(error, 'OKK')
        return res.status(500).json({
            message: "Something wrong happened",
        })
    }
} 