import {Status} from "../types/order-types.ts";

export const translateStatus = (status: Status) => {

    if (status === "PENDING") {
        return "Pendiente";
    }
    if (status === "COOKING") {
        return "En cocina";
    }
    if (status === "READY") {
        return "Listo";
    }
    if (status === "ON_THE_WAY") {
        return "En camino";
    }
    if (status === "DELIVERED") {
        return "Entregado";
    }
    if (status === "CANCELLED") {
        return "Cancelada"
    }
    return "Estado no encontrado";
}