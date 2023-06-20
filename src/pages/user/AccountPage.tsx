import {useContext} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {Navigate} from "react-router-dom";
import UserPanel from "../../components/Users/UserPanel.tsx";
import MyAccount from "../../components/Users/MyAccount.tsx";

const AccountPage = () => {

    const myContext = useContext(globalContext);

    if (myContext.userContext.authenticated) {
        return (
            <div className="row">
                <div className="col-3">
                    <UserPanel/>
                </div>
                <div className="col-9">
                    <MyAccount/>
                </div>
            </div>
        );
    }
    return <Navigate to={"/"}/>
};

export default AccountPage;