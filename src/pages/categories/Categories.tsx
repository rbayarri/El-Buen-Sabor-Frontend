import {Col, Row} from "react-bootstrap";
import {useContext} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {Link, Navigate} from "react-router-dom";
import {CategoriesTable} from "../../components/Categories/CategoriesTable.tsx";

const Categories = (props: { target: string }) => {

    const myContext = useContext(globalContext);
    const target = props.target;

    if (myContext.userContext.authenticated && (myContext.userContext.role === "CHEF" || myContext.userContext.role === "ADMIN")) {

        return (
            <>
                <Row>
                    <Col lg={6} className="d-flex align-items-center justify-content-between">
                        <h1 className="my-4 me-4 fs-2">Categorias
                            de {target.substring(0, 1).toUpperCase() + target.substring(1).toLowerCase()}</h1>
                        <Link to={`/rubros/${target}/nuevo`} className={"btn btn-success"}>Nuevo</Link>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <CategoriesTable target={target}/>
                    </Col>
                </Row>
            </>
        );
    }
    return (
        <Navigate to={"/"}/>
    )
};

export default Categories;
