import {ApiResponseError} from "../models/api-response-error.ts";
import swal from "sweetalert";
import {Method} from "../types/method.ts";

type RequestInformationProps = {
    path: string,
    method: Method,
    body?: object,
    jwt?: string
}

const basicHeader = {
    "Content-Type": "application/json"
}

const headersWithJwt = (jwt: string) => {
    return ({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt
        }
    )
}

const headersImages = (jwt: string) => {
    return ({
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + jwt
    })
}

const host = "http://localhost:8080/api/v1";
export const doRequest = async <E>({path, method, body, jwt}: RequestInformationProps) => {

    const requestOptions: RequestInit = {
        headers: path.includes("images") && (jwt) ? headersImages(jwt) : ((jwt) ? headersWithJwt(jwt) : basicHeader),
        method: method
    }
    if (body) {
        requestOptions.body = JSON.stringify(body)
    }

    path = host.concat(path);

    try {
        const response = await fetch(path, requestOptions);
        if (response.status == 200 || response.status == 201) {
            return response.json() as E;
        } else {
            showErrorMessages(await response.json() as ApiResponseError);
        }
    }catch(e){
        swal("Error", "Error de conexión", "error");
    }
}

const showErrorMessages = (errorResponse: ApiResponseError) => {
    if (errorResponse.errors) {
        let message = "";
        Object.entries(errorResponse.errors).forEach(([key, value]) => {
            message = message.concat(`${key}: ${value}\n`)
        });
        swal("Existen errores en los campos", message, "error");
    } else {
        swal(errorResponse.message, "", "error");
    }
}