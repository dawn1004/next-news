import mongoose, {Model} from "mongoose";
import { ArticleSchema } from "./schema";

export const Article = mongoose.models.Article || mongoose.model("Article", ArticleSchema);