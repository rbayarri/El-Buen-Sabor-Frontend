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
                <div className="col-12 col-sm-6 col-md-4 col-xl-3">
                    <UserPanel/>
                </div>
                <div className="col-12 col-sm-6 col-md-8 col-xl-9 mt-4 mt-sm-0">
                    <MyAccount/>
                </div>
            </div>
        );
    }
    return <Navigate to={"/"}/>
};

export default AccountPage;