import { BadRequestError } from "../errors/BadRequestError"


export interface CreateUserInputDTO {
    id: string,
    name: string,
    email: string,
    password: string
}

export interface CreateUserOutputDTO {
    messsage: string,
    user: {
        id: string,
        name: string,
        email: string
    }
}

export class UserDTO {
    public createUserInput(
        id: unknown,
        name: unknown,
        email: unknown,
        password: unknown
    ): CreateUserInputDTO {
        if(!id || !name || !email || !password) {
            throw new BadRequestError("Dados inválidos")            
        }

        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser number")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser number")
        }

        const dto: CreateUserInputDTO = {
            id,
            name,
            email,
            password
        }
        return dto
    }

    // public createUserOutput
}