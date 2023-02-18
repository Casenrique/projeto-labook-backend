import { CreateUserInputDTO } from "../dtos/UserDTO";
import { User } from "../models/User";
import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";


export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public async findUsers(q: string | undefined) {
        if(q) {
            const result: UserDB[] = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .where("name", "LIKE", `%${q}%`)
                .orWhere("id", "LIKE", `%${q}%`)
                return result
        } else {
            const result: UserDB[] = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
            return result
        }
    }

    public async findUserById(id: string) {
        const [ userDB ]: UserDB[] | undefined[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ id })
        return userDB
    }
    
    public async searchByEmail(email: string): Promise<UserDB> {
        const result: UserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where({ email })

            return result[0]
    }
    
    
    public async insertUser(newUserDB: UserDB) {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(newUserDB)
    }


}