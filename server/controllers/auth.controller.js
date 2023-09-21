import Mongoose from 'mongoose';
import UserModel from "../models/users.model";
import { comparePassword, generateToken, hashPassword } from '../helpers/authenticate';


export const signup = async (req, res) => {
    try {
        const { name, phone } = req.body;
        
        const exists = await UserModel.findOne({ phone });
        if(exists){
            return res.status(403).json({
                message: "Mother already exists",
            })
        }

        const created = await UserModel.create({
            _id: new Mongoose.Types.ObjectId(),
            name,
            phone,
            password: hashPassword('mother1234'),
            type: 'mother',
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

export const login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        console.log(req.body);
        const emailExists = await UserModel.findOne({ phone });

        if(!emailExists){
            return res.status(403).json({
                message: "Invalid username or password",
            });
        }
        const isPasswordTrue = comparePassword(password, emailExists.password);

        if(!isPasswordTrue){
            return res.status(403).json({
                message: "Invalid username or password",
            });
        }

        return res.status(200).json({
            token: generateToken(emailExists)
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong.",
        });
    }
}
