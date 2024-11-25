import{Router}from "express";
import { login,signup , getUsers} from "../controller/userController.js";


const userRouter  =Router();

userRouter.post('/signup', signup)

userRouter.post('/login', login) 

userRouter.get('/User', getUsers);

export default userRouter;

