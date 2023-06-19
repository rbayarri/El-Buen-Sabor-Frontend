import {useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {Card} from "react-bootstrap";
import {Navigate, useParams} from "react-router-dom";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {User} from "../../models/users/User.ts";
import NewEditUserForm from "../../components/Users/NewEditUserForm.tsx";

const NewEditUserByAdminPage = () => {

    const myContext = useContext(globalContext);
    const {id} = useParams();
    const [user, setUser] = useState<User>();
    const [found, setFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getUser = async (id: string) => {
        const findUserById = settings.api.users.findById;

        const foundUser = await doRequest<User>({
            path: findUserById.path + "/" + id,
            method: findUserById.method,
            jwt: myContext.userContext.jwt
        });
        if (foundUser) {
            setUser(foundUser);
            setFound(true);
            setIsLoading(false);
        }
    }

    useEffect((() => {
        if (id) {
            if (id === "nuevo") {
                setIsLoading(false);
                setFound(false);
            } else {
                getUser(id);
            }
        }
    }), []);

    if (myContext.userContext.authenticated && myContext.userContext.role === "ADMIN") {
        return (
            <>
                {isLoading ? <h1>Loading...</h1> :
                    <div
                        className="col-12 col-md-8 col-lg-5 m-auto d-flex justify-content-center flex-column align-items-center">
                        <h1 className="fs-3 text-center mb-5">Registro Nuevo usuario</h1>
                        <Card className="shadow w-100">
                            <Card.Body>
                                <NewEditUserForm user={user} found={found}/>
                            </Card.Body>
                        </Card>
                    </div>
                }
            </>
        )
    }
    return (
        <Navigate to={"/"}/>
    )
};

export default NewEditUserByAdminPage;