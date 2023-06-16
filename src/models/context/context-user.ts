import {Role} from "../../types/role.ts";

export type ContextUser = {
    name: string
    lastName: string
    role: Role
    authenticated: boolean
    jwt?: string | undefined
    onChange?: (newUser: ContextUser) => void
}