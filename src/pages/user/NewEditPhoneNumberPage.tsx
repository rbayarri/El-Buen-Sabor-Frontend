import {useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {Navigate, useParams} from "react-router-dom";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import UserPanel from "../../components/Users/UserPanel.tsx";
import NewEditAddressForm from "../../components/Users/NewEditAddressForm.tsx";
import {PhoneNumber} from "../../models/users/phone-number.ts";
import NewEditPhoneNumberForm from "../../components/Users/NewEditPhoneNumberForm.tsx";

const NewEditPhoneNumberPage = () => {

    const myContext = useContext(globalContext);
    const {id} = useParams();
    const [phoneNumber, setPhoneNumber] = useState<PhoneNumber>();
    const [found, setFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getPhoneNumber = async (id: string) => {
        const api = settings.api.phoneNumber.findById;

        const foundPhoneNumber = await doRequest<PhoneNumber>({
            path: api.path + "/" + id,
            method: api.method,
            jwt: myContext.userContext.jwt
        });
        if (foundPhoneNumber) {
            setPhoneNumber(foundPhoneNumber);
            setFound(true);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }

    useEffect((() => {
        if (id) {
            if (id === "nuevo") {
                setIsLoading(false);
                setFound(false);
            } else {
                getPhoneNumber(id);
            }
        }
    }), []);

    if (myContext.userContext.authenticated) {
        return (
            <div className="row">
                <div className="col-3">
                    <UserPanel/>
                </div>
                <div className="col-9">
                    {isLoading ? <h1>Loading...</h1> :
                        <>
                            <div className="d-flex align-items-center">
                                <h1>{found ? "Editar " : "Nuevo "}Teléfono</h1>
                            </div>
                            <NewEditPhoneNumberForm phoneNumber={phoneNumber}/>
                        </>
                    }
                </div>
            </div>
        );
    }
    return <Navigate to={"/"}/>
};

export default NewEditPhoneNumberPage;