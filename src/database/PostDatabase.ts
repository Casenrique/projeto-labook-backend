import { PostDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";


export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"

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

}