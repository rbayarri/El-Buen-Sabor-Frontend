import jwtDecode from "jwt-decode";
import {ContextUser} from "../models/context/context-user.ts";
import {TokenClaims} from "../models/auth/token-claims.tsx";

import {ContextOrder} from "../models/context/context-order.ts";

export const saveTokenCookie = (token: string) => {
    const expires = new Date();
    expires.setDate(Date.now() + 21 * 24 * 60 * 60 * 1000); // Set cookie to expire in 21 days
    document.cookie = `USERJWT=${token}; expires=${expires.toUTCString()}; path=/; sameSite=lax;`;
}

export const deleteTokenCookie = () => {
    document.cookie = "USERJWT=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; sameSite=lax;"
}

export const getJwtFromCookie = () => {

    const cookie = document.cookie.split(';').find(cookie => cookie.includes('USERJWT='));
    if (cookie) {
        // Extract the value of the cookie
        return cookie.split('=')[1];
    }
    return undefined;
}

export const getUserFromCookie = () => {
    const jwt = getJwtFromCookie();
    if (jwt) {
        const jwtContent: TokenClaims = jwtDecode(jwt);
        if (jwtContent.exp > Date.now() / 1000) {
            const jwtUser: ContextUser = {
                name: jwtContent.name,
                lastName: jwtContent.lastName,
                role: jwtContent.role,
                authenticated: true,
                jwt: jwt,
                firstTimeAccess: jwtContent.firtTimeAccess
            }
            return jwtUser;
        }
    }
    return undefined;
}

export const createCookie = () => {
    const order: ContextOrder = {
        orderDetails: [
            {
                product: {
                    id: "034e1321-9b56-4de7-af73-610b0cfc521b",
                    name: "algo",
                    description: "algo",
                    price: 0,
                    image: {
                        id: "0390a44d-4d45-40cf-a828-a88790f5d304",
                        location: "https://www.webempresa.com/foro/wp-content/uploads/wpforo/attachments/3200/318277=80538-Sin_imagen_disponible.jpg"
                    },
                    stock: 0
                },
                quantity: 2,
            },
            {
                product: {
                    id: "19721a98-ac14-4239-a3a3-644910d855f9",
                    name: "algo",
                    description: "algo",
                    price: 0,
                    image: {
                        id: "0390a44d-4d45-40cf-a828-a88790f5d304",
                        location: "https://www.webempresa.com/foro/wp-content/uploads/wpforo/attachments/3200/318277=80538-Sin_imagen_disponible.jpg"
                    },
                    stock: 0
                },
                quantity: 1,
            },
            {
                product: {
                    id: "9c500c90-7cc4-4d67-962b-dfe5ad8c564e",
                    name: "algo",
                    description: "algo",
                    price: 0,
                    image: {
                        id: "0390a44d-4d45-40cf-a828-a88790f5d304",
                        location: "https://www.webempresa.com/foro/wp-content/uploads/wpforo/attachments/3200/318277=80538-Sin_imagen_disponible.jpg"
                    },
                    stock: 0
                },
                quantity: 16,
            },
        ]
    }
    document.cookie = `ORDERINFO=${JSON.stringify(order)}; path=/; sameSite=lax;`;
}

export const getOrderFromCookie = () => {
    const cookie = document.cookie.split(';').find(cookie => cookie.includes('ORDERINFO='));
    if (cookie) {
        return JSON.parse(cookie.trim().substring(10)) as ContextOrder;
    }
    return undefined;
}

export const replaceOrderCookie = (newOrder: ContextOrder) => {
    document.cookie = `ORDERINFO=${JSON.stringify(newOrder)}; path=/; sameSite=lax;`;
}