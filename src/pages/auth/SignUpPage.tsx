import GoogleOneTapButton from "../../components/Auth/GoogleButton.tsx";
import {Card} from "react-bootstrap";
import FormSignup from "../../components/Auth/FormSignup.tsx";
import {settings} from "../../lib/settings.ts";
import {useContext} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {Navigate} from "react-router-dom";

export const SignUpPage = () => {

    const myContext = useContext(globalContext);

    if (!myContext.userContext.authenticated) {
        return (
            <div
                className="col-12 col-md-8 col-lg-5 m-auto d-flex justify-content-center flex-column align-items-center">
                <h1 className="fs-3 text-center mb-5">Ingresá y disfruta de nuestras delicias</h1>
                <GoogleOneTapButton
                    clientId={settings.google.clientId}/>
                <hr className={"w-50 my-4"}/>
                <Card className="shadow w-100">
                    <Card.Body>
                        <FormSignup/>
                    </Card.Body>
                </Card>
            </div>
        )
    }
    return (
        <Navigate to={"/"}/>
    )
}