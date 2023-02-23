import { BaseError } from "./BaseError";

export class ConflictError extends BaseError{
    constructor(
        message: string = "Registro já existente."
    ){
        super(409, message)
    }
}