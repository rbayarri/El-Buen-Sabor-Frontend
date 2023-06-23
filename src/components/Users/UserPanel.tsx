import "./profile.css";
import {useNavigate} from "react-router-dom";
import {emptyUser, globalContext} from "../../routes/AppRoutes.tsx";
import {deleteTokenCookie} from "../../lib/cookies.ts";
import {useContext} from "react";

const UserPanel = () => {

    const myContext = useContext(globalContext);
    const user  = myContext.userContext;
    const navigate = useNavigate();

    const handleLogout = () => {
        const newEmptyUser = emptyUser;
        newEmptyUser.onChange = myContext.userContext.onChange;
        if (myContext.userContext.onChange) {
            myContext.userContext.onChange(newEmptyUser);
        }
        deleteTokenCookie();
    }

    if (user) {
        return (
            <div className={"border d-flex flex-column justify-content-between"}>
                <div className="d-flex flex-column align-items-center mt-4">
                    <img
                        src={user.image ? user.image : "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"}
                        alt="User image"
                        className="rounded-circle"
                        style={{maxHeight: "100px"}}/>
                    <p className="mt-3 mb-1 fw-bold fs-5">{user.name}</p>
                    <p className="small text-muted">{user.username}</p>
                </div>
                <p className="border m-0 p-2 profile-option" onClick={() => navigate("/cuenta")}>Mis datos
                    personales</p>
                {myContext.userContext.role === "USER" &&
                    <p className="border m-0 p-2 profile-option" onClick={() => navigate("/pedidos")}>Mis
                        pedidos</p>
                }
                <p className="border m-0 p-2 profile-option"
                   onClick={() => navigate("/direcciones")}>Direcciones</p>
                <p className="border m-0 p-2 profile-option" onClick={() => navigate("/telefonos")}>Teléfonos</p>
                <p className="border m-0 p-2 profile-option exit" onClick={handleLogout}>Cerrar Sesión</p>
            </div>
        );
    }
    return <h1>Usuario no logueado</h1>
};

export default UserPanel;