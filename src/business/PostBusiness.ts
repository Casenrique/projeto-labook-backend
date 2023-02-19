import { TokenExpiredError } from "jsonwebtoken"
import { PostDatabase } from "../database/PostDatabase"
import { GetPostsInputDTO, PostDTO } from "../dtos/PostDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { PostCreatorModel } from "../types"


export class PostBusiness {
    constructor(
        // private postDTO: PostDTO,
        private postDatabase: PostDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator
    ) {}

    public getPosts = async (input: GetPostsInputDTO) => {
        
        const { q, token} = input

        if(typeof q !== "string") {
            throw new BadRequestError("'q' deve ser string")
        }
        
        if(token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null) {
            throw new BadRequestError("token inválido")
        }

        // const postDatabase = new PostDatabase
        const { 
            postsDB,
            creatorsDB
         } = await this.postDatabase.getPostWithCreator(q)

         const posts: PostCreatorModel[] = postsDB.map((postDB) => {
            const post = new Post(
                postDB.id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at,
                getCreator(postDB.creator_id)
            )

            const postToBusinesModel = post.toBusinessModel()
                      
            return postToBusinesModel
         })
    
         function getCreator(creatorId: string) {
            const creator = creatorsDB.find((creatorDB) => {
                return creatorDB.id === creatorId
            })
            return {
                id: creator.id,
                name: creator.name
            }
         }

        //  const output = this.postDTO.getPostOutput(posts)
        // return output
        return posts
    }
}