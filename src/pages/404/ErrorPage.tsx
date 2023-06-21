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
        <div>
        </div>
    );
};

export default ErrorPage;