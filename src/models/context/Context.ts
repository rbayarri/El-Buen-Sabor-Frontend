import {ContextUser} from "./context-user.ts";

import {ContextOrder} from "./context-order.ts";

export interface Context {
    userContext: ContextUser,
    order: ContextOrder
}