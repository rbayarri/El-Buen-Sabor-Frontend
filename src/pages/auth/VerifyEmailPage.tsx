import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {settings} from "../../lib/settings.ts";
import {host} from "../../lib/fetch.ts";
import swal from "sweetalert";

const VerifyEmailPage = () => {

    const {userId, tokenId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [errorResponse, setErrorResponse] = useState(false)

    const verify = async () => {
        const api = settings.api.auth.verifyEmail;

        const response = await fetch(`${host}${api.path}/${userId}/${tokenId}`,
            {
                method: "POST"
            });

        if (response.status == 200 || response.status == 201) {
            setIsLoading(false);
            swal(await response.text(), "", "success");
        } else {
            setIsLoading(false);
            setErrorResponse(true);
            swal(await response.text(), "", "error");
        }
    }

    useEffect(() => {
        verify();
    }, []);

    return (
        <>
            {isLoading ? <h1>Loading...</h1> : (
                <>
                    {errorResponse ? <h1>Falló la verificación</h1> :
                        <h1>Email verificado. Puede cerrar esta pestaña</h1>}
                </>
            )}
        </>
    );
};

export default VerifyEmailPage;