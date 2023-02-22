export interface GetUserInputDTO {
    q: string | string[] | undefined ,
    token: string | undefined
}

export interface CreateUserInputDTO {
    name: unknown,
    email: unknown,
    password: unknown
}

export interface CreateUserOutputDTO {
    token: string
}

export interface GetUserOutputDTO {
    messsage: string,
    user: {
        id: string,
        name: string,
        email: string,
        createdAt: string
    }
}

export interface LoginInputDTO {
    email: unknown, 
    password: unknown
}

export interface LoginOutputDTO {
    token: string
}
