import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {settings} from "../../lib/settings.ts";
import {host} from "../../lib/fetch.ts";
import swal from "sweetalert";
import ResetPasswordForm from "../../components/Auth/ResetPasswordForm.tsx";
import {Card} from "react-bootstrap";

const ResetPasswordPage = () => {

    const {userId, tokenId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [errorResponse, setErrorResponse] = useState(false)

    const verify = async () => {
        const api = settings.api.auth.verifyForgetPasswordToken;

        const response = await fetch(`${host}${api.path}/${userId}/${tokenId}`,
            {
                method: "POST"
            });

        if (response.status == 200 || response.status == 201) {
            setIsLoading(false);
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
                        <>
                            <div
                                className="col-12 col-md-8 col-lg-5 m-auto d-flex justify-content-center flex-column align-items-center">
                                <h1 className="fs-3 text-center mb-5">Ingresá tu nueva clave</h1>
                                <Card className="shadow w-100">
                                    <Card.Body>
                                        <ResetPasswordForm userId={userId} tokenId={tokenId}/>
                                    </Card.Body>
                                </Card>
                            </div>
                        </>}
                </>
            )}
        </>
    );
};

export default ResetPasswordPage;