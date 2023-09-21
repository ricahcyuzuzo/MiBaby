import Mongoose from 'mongoose';
import UserModel from "../models/users.model";
import { hashPassword } from '../helpers/authenticate';
import BabyModel from '../models/baby.model';

export const createPediatrician = async (req, res) => {
    try {
        const { name, phone } = req.body;
        
        const exists = await UserModel.findOne({ phone });
        if(exists){
            return res.status(403).json({
                message: "Pediatrician already exists",
            })
        }

        const created = await UserModel.create({
            _id: new Mongoose.Types.ObjectId(),
            name,
            phone,
            password: hashPassword('pedia1234'),
            type: 'pediat',
            createdAt: new Date(),
            updatedAt: new Date(),
         });

        if(created){
            return res.status(201).json({
                message: "User Created successfully",
                user: created,
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something wrong happened",
        })
    }
}

export const getPediats = async (req, res) => {
    try {
        const pediats = await UserModel.find({ type: 'pediat' });
        return res.status(200).json({
            pediats,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something wrong happened",
        })
    }
}

export const getMothers = async (req, res) => {
    try {
        const mothers = await UserModel.find({ type: 'mother' });
        return res.status(200).json({
            mothers,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something wrong happened",
        })
    }
}


export const getNumbers = async (req, res) => {
    try {
        const pediats = await UserModel.count({ type: 'pediat' });
        const mothers = await UserModel.count({ type: 'mother' });
        const babies = await BabyModel.count();

        return res.status(200).json({
            pediats,
            mothers,
            babies,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something wrong happened",
        })
    }
}
