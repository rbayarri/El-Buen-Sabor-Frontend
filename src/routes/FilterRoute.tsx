import {useContext} from "react";
import {globalContext} from "./AppRoutes.tsx";
import {Navigate} from "react-router-dom";
import {Container} from "react-bootstrap";

const FilterRoute = (props: { component: JSX.Element, withContainer: boolean }) => {

    const myContext = useContext(globalContext);

    if ((!myContext.userContext.authenticated || myContext.userContext.role === "USER") || !myContext.userContext.firstTimeAccess) {
        return (
            <>
                {props.withContainer ? <Container className="mt-5 pt-5 mb-5 pb-5">{props.component}</Container> : props.component}
            </>
        )
    } else {
        return <Navigate to={"/firstTimeAccess"}/>
    }
};

export default FilterRoute;