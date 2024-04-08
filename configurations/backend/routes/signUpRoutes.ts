import express, { Express } from "express";
import client from "../dataBase";
import userSignUp from "../models/signUpModels";
import { createUser } from "../controllers/singUpController";



const signUpRoute = express.Router()

signUpRoute.post('/',createUser)


export default signUpRoute;