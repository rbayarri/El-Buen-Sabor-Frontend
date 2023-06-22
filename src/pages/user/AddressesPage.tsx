import {useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {Address} from "../../models/users/address.ts";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {Link, Navigate} from "react-router-dom";
import AddressesTable from "../../components/Users/AddressesTable.tsx";
import UserPanel from "../../components/Users/UserPanel.tsx";

const AddressesPage = () => {

    const myContext = useContext(globalContext);
    const [addresses, setAddresses] = useState<Address[]>();
    const [isLoading, setIsLoading] = useState(true);

    const getAddresses = async () => {
        const api = settings.api.addresses.findAll;
        const response = await doRequest<Address[]>({
            path: api.path,
            method: api.method,
            jwt: myContext.userContext.jwt
        })
        if (response) {
            setAddresses(response);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAddresses();
    }, [])

    if (myContext.userContext.authenticated) {
        return (
            <div className="d-flex flex-column flex-md-row">
                <div className="col-12 col-md-3 col-xl-3">
                    <UserPanel/>
                </div>
                <div className="col-12 col-md-9 ms-0 ms-md-3 mt-4 mt-sm-0">
                    {isLoading ? <h1>Loading...</h1> :
                        <>
                            <div className="d-flex align-items-center mb-3">
                                <h1>Direcciones</h1>
                                <Link className="btn btn-success ms-3" to={"/direcciones/nuevo"}>Nuevo</Link>
                            </div>
                            {addresses && addresses.length > 0 ?
                                <AddressesTable addresses={addresses}/> :
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

export default AddressesPage;