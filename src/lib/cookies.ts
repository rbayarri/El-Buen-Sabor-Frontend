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
                firstTimeAccess: jwtContent.firstTimeAccess,
                image: jwtContent.image,
                username: jwtContent.sub
            }
            return jwtUser;
        }
    }
    return undefined;
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