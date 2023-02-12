import { UserDatabase } from "../database/UserDatabase";
import { CreateUserInputDTO, UserDTO } from "../dtos/UserDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../models/User";
import { UserDB } from "../types";


export class UserBusiness {
    constructor(
        public userDTO: UserDTO,
        public userDatabase: UserDatabase
    ){}

    public createUser = async (input: CreateUserInputDTO) => {
        const { id, name, email, password } = input
        
        if(id[0] !== "u") {
            throw new BadRequestError("'id' deve começar com a letra 'u'.") 
        }

        if(id.length < 4) {
            throw new BadRequestError("'id' deve possuir pelo menos 4 caracteres.")
        }

        if (!email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
            throw new BadRequestError("'email' deve ser de um domínio válido")
        }

        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
            throw new BadRequestError("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
        }

        // const userDatabase = new UserDatabase()
        const userDBExists = await this.userDatabase.findUserById(id)

        if (userDBExists) {
            throw new BadRequestError("'id' já existe")
        }

        const newUser = new User(
            id,
            name,
            email,
            password,
            "user",
            new Date().toISOString()
        )

        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole(),
            created_at: newUser.getCreatedAt(),
        }

        await this.userDatabase.insertUser(newUserDB)

        // const output = {
        //     message: "Produto registrado com sucesso!",
        //     user: newUser
        // }

        const output = this.userDTO.createUserOutput(newUser)
        return output
    }


}