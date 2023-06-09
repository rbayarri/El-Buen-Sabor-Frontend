import jwtDecode from "jwt-decode";
import {ContextUser} from "../models/context-user.ts";
import {TokenClaims} from "../models/token-claims.tsx";

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
            }
            return jwtUser;
        }
    }
    return undefined;
}