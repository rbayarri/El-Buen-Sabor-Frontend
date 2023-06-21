export interface NewEditUser {
    name: string,
    lastName: string,
    username: string,
    password?: string,
    confirmPassword?: string,
    role: string,
    active: boolean
}