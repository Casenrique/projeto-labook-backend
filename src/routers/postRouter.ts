import express from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostController } from "../controller/PostController"
import { PostDatabase } from "../database/PostDatabase"
import { PostDTO } from "../dtos/PostDTO"

export const postRouter  = express.Router()

const postController = new PostController(
    // new PostDTO(),
    new PostBusiness(
        new PostDatabase()
    )
)

postRouter.get("/", postController.getPosts)