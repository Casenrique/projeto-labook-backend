import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDTO } from "../dtos/UserDTO";
import { BaseError } from "../errors/BaseError";

export class UserController {
    constructor(
        private userDTO: UserDTO,
        private userBusiness: UserBusiness
    ){}

    // public getUsers = async (req: Request, res: Response) => {
    //     try {
    //         const input = {
    //             q: req.query.q
    //         }

    //         const output = await this.userBusiness.getUsers(input)

    //     } catch (error) {
    //         console.log(error)
    //         if (error instanceof BaseError) {
    //             res.status(error.statusCode).send(error.message)
    //         } else {
    //             res.status(500).send("Erro inesperado")
    //         }
    //     }
    // }

    public createUser = async (req: Request, res: Response) => {
        try {
            // const userDTO = new UserDTO()
            const input = this.userDTO.createUserInput(
                req.body.id,
                req.body.name,
                req.body.email,
                req.body.password
            )
        
        // const userBusiness = new UserBusiness()
        const output = await this.userBusiness.createUser(input)
        
        res.status(201).send(output)


        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }



}