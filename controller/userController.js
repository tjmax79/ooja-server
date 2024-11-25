import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()


const getToken = ({id}) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
         expiresIn: '3d'
    });
}

export const  signup = async (req, res) => {
const {firstName, lastName, userName,age,email, password} = req.body;
console.log(req.body)
try {
    const user = await User.signup(firstName,lastName, userName,age,email,password);
    res.status(200).json({user,token: await getToken(user)});
} catch (error) {
    res.status(400).json({error: error.message});
}

};

export const login = async(req, res) =>{
    const{email,password}= req.body;
    try{
        const user = await User.login(email, password);
        res.status(200).json({user, token:await getToken(user)});

    }catch (error) {
        res.status(400).json({error:error.message});
    }
}

// to be deleted on production
export const getUsers = async(req, res) =>{
    try {
        const users = await User.find();
        res.status(200).json({users});

    }catch  (error) {
        res.status(400).json({error:error.message});
    }
}