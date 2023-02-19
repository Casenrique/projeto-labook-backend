import { TokenExpiredError } from "jsonwebtoken"
import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { CreatePostInputDTO, GetPostCreatorOutputDTO, GetPostsInputDTO, PostDTO } from "../dtos/PostDTO"
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

    public getPosts = async (input: GetPostsInputDTO): Promise<PostCreatorModel[]> => {
        
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
        
        return posts
    }

    public createPost = async (input: CreatePostInputDTO): Promise<void> => {
        
        const { content, token } = input
       
        if(token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null) {
            throw new BadRequestError("token inválido")
        }

        if(typeof content !== "string") {
            throw new BadRequestError("'content' deve ser string")
        }

        const id = this.idGenerator.generate()
        const creatorId = payload.id
        const creatorName = payload.name
        const createdAt = new Date().toISOString()
        const updatedAt = new Date().toISOString()

        function getCreator(creatorId: string, creatorName: string) {
            return {
                id: creatorId,
                name: creatorName
            }
         }
        const post = new Post(
            id,
            content,
            0,
            0,
            createdAt,
            updatedAt,
            getCreator(creatorId, creatorName)
        )

        const postDB = post.toDBModel()

        await this.postDatabase.insert(postDB)

    }
}