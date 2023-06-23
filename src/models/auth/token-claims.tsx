import {Role} from "../../types/role.ts";

export interface TokenClaims {
    sub: string,
    iat: number
    exp: number,
    name: string,
    lastName: string,
    role: Role,
    firstTimeAccess: boolean,
    image: string
}