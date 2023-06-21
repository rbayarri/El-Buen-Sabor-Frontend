import {useNavigate, useParams} from "react-router-dom";
import swal from "sweetalert";
import {useEffect} from "react";

const ErrorPage = () => {

    const {message} = useParams();
    const navigate = useNavigate();

    const showMessage = async () => {
        await swal(message as string, "", "error");
        navigate("/");
    }

    useEffect(() => {
        if (message) {
            showMessage();
        }
    })
    return (
        <div className="text-center mt-5">
            <h1 className="mb-4">Page Not Found</h1>
            <p className="mb-4">Lo sentimos, la página que estás buscando no fue encontrada.</p>
            <a href="/" className="btn btn-primary">Página Principal</a>
        </div>
    )
        ;
};

export default ErrorPage;