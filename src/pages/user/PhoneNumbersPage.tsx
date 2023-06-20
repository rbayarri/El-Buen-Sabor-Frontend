import {useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import UserPanel from "../../components/Users/UserPanel.tsx";
import {Link, Navigate} from "react-router-dom";
import {PhoneNumber} from "../../models/users/phone-number.ts";
import PhoneNumbersTable from "../../components/Users/PhoneNumbersTable.tsx";

const PhoneNumbersPage = () => {
    const myContext = useContext(globalContext);
    const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>();
    const [isLoading, setIsLoading] = useState(true);

    const getPhoneNumbers = async () => {
        const api = settings.api.phoneNumber.findAll;
        const response = await doRequest<PhoneNumber[]>({
            path: api.path,
            method: api.method,
            jwt: myContext.userContext.jwt
        })
        if (response) {
            setPhoneNumbers(response);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getPhoneNumbers();
    }, [])

    if (myContext.userContext.authenticated) {
        return (
            <div className="row">
                <div className="col-3">
                    <UserPanel/>
                </div>
                <div className="col-9">
                    {isLoading ? <h1>Loading...</h1> :
                        <>
                            <div className="d-flex align-items-center mb-3">
                                <h1>Teléfonos</h1>
                                <Link className="btn btn-success ms-3" to={"/telefonos/nuevo"}>Nuevo</Link>
                            </div>
                            {phoneNumbers && phoneNumbers.length > 0 ?
                                <PhoneNumbersTable phoneNumbers={phoneNumbers}/> :
                                <p>Sin registros</p>
                            }
                        </>
                    }
                </div>
            </div>
        );
    }
    return <Navigate to={"/"}/>
};

export default PhoneNumbersPage;