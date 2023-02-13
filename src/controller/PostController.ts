import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostDTO } from "../dtos/PostDTO";
import { BaseError } from "../errors/BaseError";


export class PostController {
    constructor(
        // private postDTO: PostDTO,
        private postBusiness: PostBusiness
    ) {}
    public getPosts = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined

            // const postBusiness = new PostBusiness()
            const output = await this.postBusiness.getPosts(q)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if(error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}