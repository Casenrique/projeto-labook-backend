import { BadRequestError } from "../errors/BadRequestError"
import { User } from "../models/User"


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
        email: string,
        createdAt: string
    }
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

    public createUserOutput(user: User): CreateUserOutputDTO {
        const dto: CreateUserOutputDTO = {
            messsage: "Usuário cadastrado com sucesso!",
            user: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                createdAt: user.getCreatedAt()
            }
        }
        return dto
    }

    // public getUserOutput(user: User): GetUserOutputDTO {
    //     const dto: GetUserOutputDTO = {
    //         messsage: "Lista de todos os usuários cadastrados.",
    //         user 
    //     }
    // }
}