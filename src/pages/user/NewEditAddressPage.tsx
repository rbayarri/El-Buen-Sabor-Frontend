import {useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {Address} from "../../models/users/address.ts";
import {Navigate, useParams} from "react-router-dom";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import UserPanel from "../../components/Users/UserPanel.tsx";
import NewEditAddressForm from "../../components/Users/NewEditAddressForm.tsx";

const NewEditAddressPage = () => {

    const myContext = useContext(globalContext);
    const {id} = useParams();
    const [address, setAddress] = useState<Address>();
    const [found, setFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getAddress = async (id: string) => {
        const api = settings.api.addresses.findById;

        const foundAddress = await doRequest<Address>({
            path: api.path + "/" + id,
            method: api.method,
            jwt: myContext.userContext.jwt
        });
        if (foundAddress) {
            setAddress(foundAddress);
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
                getAddress(id);
            }
        }
    }), []);

    if (myContext.userContext.authenticated) {
        return (
            <div className="d-flex flex-column flex-md-row">
                <div className="col-12 col-md-3 col-xl-3">
                    <UserPanel/>
                </div>
                <div className="col-12 col-md-9 ms-0 ms-md-3 mt-4 mt-sm-0">
                    {isLoading ? <h1>Loading...</h1> :
                        <>
                            <div className="d-flex align-items-center mt-3 mt-md-0">
                                <h1>{found ? "Editar " : "Nueva "}Dirección</h1>
                            </div>
                            <NewEditAddressForm address={address}/>
                        </>
                    }
                </div>
            </div>
        );
    }
    return <Navigate to={"/"}/>
};

export default NewEditAddressPage;