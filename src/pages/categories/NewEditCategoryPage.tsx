import {Col, Row} from "react-bootstrap";
import {Navigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {NewEditCategoryForm} from "../../components/Categories/NewEditCategoryForm.tsx";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {NewEditCategory} from "../../models/categories/new-edit-category.ts";

const initCategory: NewEditCategory = {
    name: "",
    active: true,
    container: false
}

export const NewEditCategoryPage = (props: { target: string }) => {

    const {id} = useParams()
    const myContext = useContext(globalContext);
    const target = props.target;
    const [category, setCategory] = useState<NewEditCategory>(initCategory);
    const [found, setFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getCategory = async (id: string) => {
        const findCategoryApiSetting = settings.api.categories.findById;

        const fetchedCategory = await doRequest<NewEditCategory>({
            path: findCategoryApiSetting.path + id,
            method: findCategoryApiSetting.method,
            jwt: myContext.userContext.jwt
        });
        if (fetchedCategory) {
            setCategory(fetchedCategory);
            setFound(true);
            setIsLoading(false);
        }
    }

    useEffect((() => {
        if (id) {
            if (id === "nuevo") {
                setIsLoading(false);
                setFound(false);
            } else {
                getCategory(id);
            }
        }
    }), [target]);

    if (myContext.userContext.authenticated && (myContext.userContext.role === "CHEF" || myContext.userContext.role === "ADMIN")) {
        return (
            <>
                {isLoading ? <h1>Loading...</h1> : (
                    <>
                        <Row>
                            <Col lg={6}>
                                <h1 className="my-4 me-4 fs-2">{found ? "Editar" : "Nuevo"} Rubro</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6}>
                                <NewEditCategoryForm target={target} category={category} found={found}/>
                            </Col>
                        </Row>
                    </>
                )}
            </>
        )
    }
    return (
        <Navigate to={"/"}/>
    )
}