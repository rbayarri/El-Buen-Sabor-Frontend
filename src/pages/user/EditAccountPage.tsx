import {useContext} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import UserPanel from "../../components/Users/UserPanel.tsx";
import {Navigate} from "react-router-dom";
import EditAccountForm from "../../components/Users/EditAccountForm.tsx";

const EditAccountPage = () => {

    const myContext = useContext(globalContext);

    if (myContext.userContext.authenticated) {
        return (
            <div className="row">
                <div className="col-3">
                    <UserPanel/>
                </div>
                <div className="col-9">
                    <EditAccountForm/>
                </div>
            </div>
        );
    }
    return <Navigate to={"/"}/>
};

export default EditAccountPage;