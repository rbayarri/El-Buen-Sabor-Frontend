import {Image} from "../image.ts";
import {Role} from "../../types/role.ts";
import {PhoneNumber} from "./phone-number.ts";
import {Address} from "./address.ts";

export interface User {
    id: string
    username: string;
    name: string;
    lastName: string;
    role?: Role,
    image: Image,
    addresses: Address[],
    phoneNumbers: PhoneNumber[],
    emailConfirmed: boolean,
    active: boolean,
    firstTimeAccess?: boolean
}