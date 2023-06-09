import {Card} from "react-bootstrap";
import ForgetPasswordForm from "../../components/Auth/ForgetPasswordForm.tsx";

const ForgetPasswordPage = () => {
    return (
        <div
            className="col-12 col-md-8 col-lg-5 m-auto d-flex justify-content-center flex-column align-items-center">
            <h1 className="fs-3 text-center mb-5">Ingresá tu correo electrónico</h1>
            <Card className="shadow w-100">
                <Card.Body>
                    <ForgetPasswordForm/>
                </Card.Body>
            </Card>
        </div>
    )
};

export default ForgetPasswordPage;