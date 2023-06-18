import {Navigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import Ingredient from "../../models/ingredient.ts";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {Col, Row} from "react-bootstrap";
import NewEditIngredientForm from "../../components/Cook/NewEditIngredientForm.tsx";

const initIngredient: Ingredient = {
    id: "0",
    name: "",
    category: {
        id: "0",
        name: "",
    },
    minimumStock: 0,
    measurementUnit: "0",
    active: true,
    currentStock: 0,
    lastCost: 0,
};

const NewEditIngredientPage = () => {

    const {id} = useParams()
    const myContext = useContext(globalContext);
    const [ingredient, setIngredient] = useState<Ingredient>(initIngredient);
    const [found, setFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getIngredient = async (id: string) => {
        const findIngredientApi = settings.api.ingredients.findById;

        const fetchedIngredient = await doRequest<Ingredient>({
            path: findIngredientApi.path + "/" + id,
            method: findIngredientApi.method,
            jwt: myContext.userContext.jwt
        });
        if (fetchedIngredient) {
            setIngredient(fetchedIngredient);
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
                getIngredient(id);
            }
        }
    }), []);

    if (myContext.userContext.authenticated && (myContext.userContext.role === "CHEF" || myContext.userContext.role === "ADMIN")) {
        return (
            <>
                {isLoading ? <h1>Loading...</h1> : (
                    <>
                        <Row>
                            <Col lg={6}>
                                <h1 className="my-2 fs-2">{found ? "Editar" : "Nuevo"} Ingrediente</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} className={"mb-5"}>
                                <NewEditIngredientForm ingredient={ingredient} found={found}/>
                            </Col>
                        </Row>
                    </>
                )}
            </>
        );
    }
    return (
        <Navigate to={"/"}/>
    )
}

export default NewEditIngredientPage;