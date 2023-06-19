import {Role} from "../types/role.ts";

export const translateRole = (role: Role) => {

    if (role === "USER") {
        return "Usuario";
    }
    if (role === "CASHIER") {
        return "Cajero";
    }
    if (role === "CHEF") {
        return "Cocinero";
    }
    if (role === "DELIVERY") {
        return "Delivery";
    }
    if (role === "ADMIN") {
        return "Admin";
    }
    return "Rol no encontrado";
}