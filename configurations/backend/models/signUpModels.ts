import Joi from "joi";
import { NUMBER, STRING, Sequelize } from "sequelize";

const userSignUp = {
    id: Joi.number().required(),
    name: Joi.string().max(20).required(),
    email: Joi.string().max(20).required(),
    password: Joi.string().min(10).max(20).required(),
}

export default userSignUp;