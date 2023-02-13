import { PostDatabase } from "../database/PostDatabase"
import { PostDTO } from "../dtos/PostDTO"
import { Post } from "../models/Post"
import { PostCreatorModel } from "../types"


export class PostBusiness {
    constructor(
        private postDTO: PostDTO,
        private postDatabase: PostDatabase
    ) {

    }

    public getPosts = async (q: string | undefined) => {
        
        const postDatabase = new PostDatabase
        const { 
            postsDB,
            creatorsDB
         } = await postDatabase.getPostWithCreator(q)

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

            return post.toBusinessModel()
         })
         console.log(posts)

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