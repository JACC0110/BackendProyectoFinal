import { Sequelize } from "sequelize-typescript";
import { Friend } from "../models/Friends";

export const sequelize = new Sequelize({
    database: "friends",
    username: "postgres",
    password: "password",
    host: "localhost",
    dialect: "postgres",
    models: [Friend],
})