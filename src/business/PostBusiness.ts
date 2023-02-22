import { PostDatabase } from "../database/PostDatabase"
import { CreatePostInputDTO, DeletePostInputDTO, EditPostInputDTO, GetPostCreatorOutputDTO, GetPostsInputDTO, LikeOrDislikePostInputDTO, PostDTO } from "../dtos/PostDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Post } from "../models/Post"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager, USER_ROLES } from "../services/TokenManager"
import { CreatorPost, LikeDislikeDB, PostCreatorModel, PostDB, POST_LIKE, TokenPayLoad } from "../types"


export class PostBusiness {
    constructor(
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

        function getCreator(creatorId: string, creatorName: string): CreatorPost {
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

    public editPost = async (input: EditPostInputDTO): Promise<void> => {
        
        const { idToEdit, content, token } = input
       
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

        const postDB: PostDB | undefined = await this.postDatabase.searchPostById(idToEdit)

        if(!postDB) {
            throw new NotFoundError("'id' do post não encontrado.")            
        }

        const creatorId = payload.id
        const creatorName = payload.name

        if(postDB.creator_id !== creatorId) {
            throw new BadRequestError("Somente o criador do post pode editá-lo.")
        }
        

        function getCreator(creatorId: string, creatorName: string): CreatorPost {
            return {
                id: creatorId,
                name: creatorName
            }
         }

        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            getCreator(creatorId, creatorName)
        )

        post.setContent(content)
        post.setUpdatedAt(new Date().toISOString())

        const updatedPostDB = post.toDBModel()

        await this.postDatabase.updatePost(idToEdit, updatedPostDB)

    }

    public deletePost = async (input: DeletePostInputDTO): Promise<void> => {
        
        const { idToDelete, token } = input
       
        if(token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null) {
            throw new BadRequestError("token inválido")
        }

        
        const postDB: PostDB | undefined = await this.postDatabase.searchPostById(idToDelete)

        if(!postDB) {
            throw new NotFoundError("'id' do post não encontrado.")            
        }

        const creatorId = payload.id

        if(payload.role !== USER_ROLES.ADMIN
            && postDB.creator_id !== creatorId
            ) {
            throw new BadRequestError("Somente o criador do post ou admistrador pode apagá-lo.")
        }   

        await this.postDatabase.deletePost(idToDelete)

    }

    public likeOrDislikePost = async (input: LikeOrDislikePostInputDTO): Promise<void> => {
        
        const { idToLikeOrDislike, token, like } = input
       
        if(token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null) {
            throw new BadRequestError("token inválido")
        }

        if(typeof like !== "boolean") {
            throw new BadRequestError("'like' deve ser boolean")            
        }
        
        const postWithCreatorDB = await this.postDatabase.getPostWithCreatorById(idToLikeOrDislike)

        if(!postWithCreatorDB) {
            throw new NotFoundError("'id' do post não encontrado.")            
        }

        const userId = payload.id
        const creatorId = postWithCreatorDB.creator_id
        const creatorName = postWithCreatorDB.creator_name
        
        if(postWithCreatorDB.creator_id === userId) {
            throw new BadRequestError("O criador do post não pode dar like ou dislike em seu próprio post")
        }   
        
        const convertedId = like ? 1 : 0

        const likeDislikeDB: LikeDislikeDB = {
            user_id: userId,
            post_id: postWithCreatorDB.id,
            like: convertedId
        }
        
        function getCreator(creatorId: string, creatorName: string): CreatorPost {
            return {
                id: creatorId,
                name: creatorName
            }
         }

        const post = new Post(
            postWithCreatorDB.id,
            postWithCreatorDB.content,
            postWithCreatorDB.likes,
            postWithCreatorDB.dislikes,
            postWithCreatorDB.created_at,
            postWithCreatorDB.updated_at,
            getCreator(creatorId, creatorName)
        )

        const likeDislikeAlreadyExists = await this.postDatabase.searchLikeDislike(likeDislikeDB)

        if(likeDislikeAlreadyExists === POST_LIKE.ALREADY_LIKED) {

            if(like) {
                await this.postDatabase.removeLikeDislike(likeDislikeDB)
                post.removeLike()
            } else {
                await this.postDatabase.updateLikeDislike(likeDislikeDB)
                post.removeLike()
                post.addDislike()
            }
        } else if(likeDislikeAlreadyExists === POST_LIKE.ALREADY_DISLIKED) {

            if(like) {
                await this.postDatabase.updateLikeDislike(likeDislikeDB)
                post.removeDislike()
                post.addLike()
            } else {
                await this.postDatabase.removeLikeDislike(likeDislikeDB)
                post.removeDislike()
            }

        } else {
            await this.postDatabase.likeOrDislikePost(likeDislikeDB)
            like ? post.addLike() : post.addDislike()
        }

        const updatedPostDB = post.toDBModel()
        await this.postDatabase.updatePost(idToLikeOrDislike, updatedPostDB)

    }
}