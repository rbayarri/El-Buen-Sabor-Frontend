import {Card} from "react-bootstrap";
import ResetPasswordForm from "../../components/Auth/ResetPasswordForm.tsx";
import {useContext} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";

const ChangePasswordPage = () => {

    const myContext = useContext(globalContext);

    return (
        <div
            className="col-12 col-md-8 col-lg-5 m-auto d-flex justify-content-center flex-column align-items-center mt-5 pt-5">

            <h1 className="fs-3 text-center">Hola {myContext.userContext.name}!</h1>
            <h2 className="fs-5 text-center mb-3 mt-4">Ingresá tu nueva clave</h2>
            <Card className="shadow w-100">
                <Card.Body>
                    <ResetPasswordForm userId={undefined} tokenId={undefined}/>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ChangePasswordPage;