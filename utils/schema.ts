import mongoose from "mongoose";

export const ArticleSchema = new mongoose.Schema({
    title: String,
    slug: String,
    origSizeImgUrl: String,
    thumbSizeImgUrl: String,
    body: String,
    author: String,
    published: { type : Date, default: Date.now }
})
