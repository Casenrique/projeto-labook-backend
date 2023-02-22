import { LikeDislikeDB, PostDB, PostWithCreatorDB, POST_LIKE } from "../types";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";


export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

    public getAllPosts = async () => {
        const postsDB = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select()

        return postsDB
    }

    public getPostsByContent = async (q: string) => {
        const postDB = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where("content", "LIKE", `%${q}%`)

        return postDB

    }
    
    public getPostWithCreator = async (q: string | undefined) => {
        let postsDB: PostDB[]

        if(q) {
            postsDB = await this.getPostsByContent(q)
        } else {
            postsDB = await this.getAllPosts()
        }

        const creatorsDB = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()

        return{
            postsDB,
            creatorsDB
        }
    }

    public insert = async (postDB: PostDB) => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(postDB)
    }  

    public searchPostById = async (id: string) => {
        const result: PostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select()
            .where({ id })

        return result[0]        
    }

    public updatePost = async (idToEdit: string, updatedPostDB: PostDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .update(updatedPostDB)
            .where({ id: idToEdit })    
    }

    public deletePost = async (idToDelete: string): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .delete()
            .where({ id: idToDelete })
    }
    public getPostWithCreatorById = async (postId: string): Promise<PostWithCreatorDB> => {
        const result: PostWithCreatorDB[] =  await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                "posts.id",
                "posts.creator_id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "users.name AS creator_name"
            )
            .join("users", "posts.creator_id", "=", "users.id")
            .where(`posts.id`, postId )
            
            return result[0] 
        
    }

    public likeOrDislikePost = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .insert(likeDislikeDB)
    }

    public searchLikeDislike = async (likeDislikeDBToFind: LikeDislikeDB): Promise<POST_LIKE | null> => {
        const [ likeDislikeDB ]: LikeDislikeDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .select()
            .where({
                user_id: likeDislikeDBToFind.user_id,
                post_id: likeDislikeDBToFind.post_id
            })

        if(likeDislikeDB) {
            return likeDislikeDB.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DISLIKED
        } else {
            return null
        }

    }

    public removeLikeDislike = async (likeDislikeDB :LikeDislikeDB) => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .delete()
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            })
    }

    public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB) => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .update(likeDislikeDB)
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            })
    }

}