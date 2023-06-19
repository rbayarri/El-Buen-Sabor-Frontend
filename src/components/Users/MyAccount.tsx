import {User} from "../../models/users/User.ts";
import {useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {Link} from "react-router-dom";
import {settings} from "../../lib/settings.ts";
import {doRequest, host} from "../../lib/fetch.ts";
import {translateRole} from "../../lib/role-transate.ts";
import swal from "sweetalert";
import {Button} from "react-bootstrap";

const MyAccount = () => {

    const myContext = useContext(globalContext);
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState(true);

    const getUser = async () => {

        const api = settings.api.users.profile;
        const response = await doRequest<User>({
            path: api.path,
            method: api.method,
            jwt: myContext.userContext.jwt
        });
        if (response) {
            setUser(response);
            setIsLoading(false);
        }
    }

    const handleVerifyEmail = async () => {
        const api = settings.api.users.sendVerificationEmail;

        const response = await fetch(`${host}${api.path}`,{
            method: "POST",
            headers: {
                "Authorization": `Bearer ${myContext.userContext.jwt}`
            }
        });
        if (response.ok) {
            swal("Email enviado", "Verificá tu correo electrónico", "success");
        } else {
            swal("Error", "No se pudo enviar correo electrónico. Intente nuevamente más tarde", "error");

        }

    }

    useEffect(() => {
        getUser();
    }, [])


    return (
        <>
            {isLoading ? <h1>Loading...</h1> : user &&
                <>
                    <h1 className="fs-2">Mi cuenta</h1>
                    <div className="d-flex flex-align-center mt-4 mb-3">
                        <h2 className="fs-5 fw-bold">Datos personales</h2>
                        <Link to="/cuenta/editar" state={{user: user}}
                              className="btn btn-outline-dark btn-sm ms-4">Editar</Link>
                    </div>
                    <p className="small text-muted mb-0">Nombre</p>
                    <p>{user.name}</p>
                    <p className="small text-muted mb-0">Apellido</p>
                    <p>{user.lastName}</p>
                    {user.role &&
                        <>
                            <p className="small text-muted mb-0">Rol</p>
                            <p>{translateRole(user.role)}</p>
                        </>
                    }
                    <div className="d-flex align-items-center">
                        <p className="small text-muted mb-0">Email verificado</p>
                        {!user.emailConfirmed && <Button variant="outline-secondary" size="sm" className="ms-3" onClick={handleVerifyEmail}>Verificar</Button>}
                    </div>
                    <p>{user.emailConfirmed ? "Si" : "No"}</p>
                    <Link to="/cuenta/editar" state={{user: user}} className="btn btn-outline-dark btn-sm">Cambiar
                        contraseña</Link>
                </>
            }
        </>
    )
        ;
};

export default MyAccount;