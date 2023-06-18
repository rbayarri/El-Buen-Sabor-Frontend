import {useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import Ingredient from "../../models/ingredient.ts";
import {Navigate, useParams} from "react-router-dom";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {Col, Row} from "react-bootstrap";
import BuyIngredientForm from "../../components/Cook/BuyIngredientForm.tsx";

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

const BuyIngredientPage = () => {

    const myContext = useContext(globalContext);
    const {id} = useParams()
    const [ingredient, setIngredient] = useState<Ingredient>(initIngredient);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [found, setFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getIngredients = async () => {
        const findActiveIngredients = settings.api.ingredients.active;

        const fetchedIngredients = await doRequest<Ingredient[]>({
            path: findActiveIngredients.path,
            method: findActiveIngredients.method,
            jwt: myContext.userContext.jwt
        });
        if (fetchedIngredients) {
            setIngredients(fetchedIngredients);
            if (id) {
                if (id !== "nuevo") {
                    const wanted = fetchedIngredients.find(ingr => ingr.id === id);
                    if (wanted) {
                        setIngredient(wanted);
                        setFound(true);
                    }
                }
            }
            setIsLoading(false);
        }
    }

    useEffect((() => {
        getIngredients();
    }), []);

    if (myContext.userContext.authenticated && (myContext.userContext.role === "CHEF" || myContext.userContext.role === "ADMIN")) {
        return (
            <>
                {isLoading ? <h1>Loading...</h1> : (
                    <>
                        <Row>
                            <Col lg={6}>
                                <h1 className="my-2 fs-2">Compra de Ingrediente</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} className={"mb-5"}>
                                <BuyIngredientForm ingredients={ingredients} ingredient={ingredient} found={found}/>
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
};

export default BuyIngredientPage;