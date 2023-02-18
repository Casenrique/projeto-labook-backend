import { Post } from "../models/Post"

export interface GetPostsInputDTO {
    token: string | undefined
}

export interface GetPostCreatorOutputDTO {
    messsage: string,
    post: {
        id: string,
        content: string,
        likes: number,
        dislikes: number,
        created_at: string,
        updated_at: string,
        creator: {
            id: string,
            name: string
        }
    } 
}

export interface CreatePostInputDTO {
    token: string | undefined,
    content: unknown
}

export interface EditPostInputDTO {
    idToEdit: string,
    token: string | undefined,
    content: unknown
}

export interface DeletePostInputDTO {
    idToDelete: string,
    token: string | undefined
}

export interface LikeOrDislikePostInputDTO {
    idToLikeOrDislike: string,
    token: string | undefined,
    like: unknown
}

export class PostDTO extends Post {
    public getPostOutput(post: Post): GetPostCreatorOutputDTO {
        const dto: GetPostCreatorOutputDTO = {
            messsage: "Lista dos posts com seu respectivo criador.",            
            post: {
                id: post.getId(),
                content: post.getContent(),
                likes: post.getLikes(),
                dislikes: post.getDislikes(),
                created_at: post.getCreatedAt(),
                updated_at: post.getUpdatedAt(),
                creator: post.getCreator()     
            } 
        }

    return dto
    
    }
}