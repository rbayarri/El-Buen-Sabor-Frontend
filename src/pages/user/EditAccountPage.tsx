import {useContext} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import UserPanel from "../../components/Users/UserPanel.tsx";
import {Navigate} from "react-router-dom";
import EditAccountForm from "../../components/Users/EditAccountForm.tsx";

const EditAccountPage = () => {

    const myContext = useContext(globalContext);

    if (myContext.userContext.authenticated) {
        return (
            <div className="d-flex flex-column flex-md-row">
                <div className="col-12 col-md-3 col-xl-3">
                    <UserPanel/>
                </div>
                <div className="col-12 col-md-9 ms-0 ms-md-3 mt-4 mt-sm-0">
                    <EditAccountForm/>
                </div>
            </div>
        );
    }
    return <Navigate to={"/"}/>
};

export default EditAccountPage;