import express from "express"
import { UserController } from "../controller/UserController"
import { UserDTO } from "../dtos/UserDTO"

export const userRouter = express.Router()

const userController = new UserController()

userRouter.post("/signup", userController.createUser)