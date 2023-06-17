import {Role} from "../../types/role.ts";

export type ContextUser = {
    name: string
    lastName: string
    role: Role
    authenticated: boolean
    jwt?: string | undefined,
    firstTimeAccess: boolean,
    onChange?: (newUser: ContextUser) => void
}