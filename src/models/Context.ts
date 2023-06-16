import {ContextUser} from "./context-user.ts";
import {CookieOrder} from "./order.ts";

export interface Context {
    userContext: ContextUser,
    order: CookieOrder
}