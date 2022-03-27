import mongoose, {Model} from "mongoose";
import {Article} from "./model"

const { MONGO_URI } = process.env

export const connect = async () => {
    const conn = await mongoose
        .connect(MONGO_URI as string)
        .catch(err => console.log(err))
    
    console.log("Mongoose Connection Established")

    return { conn, Article }
}