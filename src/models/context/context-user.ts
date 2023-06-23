import {Role} from "../../types/role.ts";

export type ContextUser = {
    name: string
    lastName: string
    role: Role
    authenticated: boolean
    jwt?: string | undefined,
    firstTimeAccess: boolean,
    image: string,
    username: string,
    onChange?: (newUser: ContextUser) => void
}