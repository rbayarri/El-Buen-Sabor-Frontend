import {Address} from "../users/address.ts";
import {PhoneNumber} from "../users/phone-number.ts";

export interface Registration {

    name: string,
    lastName: string,
    address?: Address,
    phoneNumber?: PhoneNumber,
    username: string,
    password: string,
    confirmPassword: string,

}