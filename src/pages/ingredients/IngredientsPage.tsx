import {ChangeEventHandler, useContext, useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import Ingredient from "../../models/ingredient.ts";
import {Button, Form} from "react-bootstrap";
import {Search} from "react-bootstrap-icons";
import IngredientsTable from "../../components/Cook/IngredientsTable.tsx";
import {doRequest} from "../../lib/fetch.ts";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {settings} from "../../lib/settings.ts";

const IngredientsPage = () => {

    const myContext = useContext(globalContext);
    const [busqueda, setBusqueda] = useState<string>("");
    const [ingredientes, setIngredientes] = useState<Ingredient[]>([]);
    const [ingredientesFiltrados, setIngredientesFiltrados] = useState<Ingredient[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getIngredientes = async () => {

        const api = settings.api.ingredients.findAll;
        const response = await doRequest<Ingredient[]>({
            path: api.path,
            method: api.method,
            jwt: myContext.userContext.jwt
        });
        if (response) {
            setIngredientes(response);
            setIngredientesFiltrados(response);
            setIsLoading(false);
        }
    }

    const filtrar: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        const ingredientesFiltrados =
            ingredientes.filter((i) => i.name.toLowerCase().includes(value.toLowerCase()));
        setIngredientesFiltrados(ingredientesFiltrados);
        setBusqueda(value);
    }

    useEffect((() => {
        getIngredientes();
    }), []);

    if (myContext.userContext.authenticated && (myContext.userContext.role === "CHEF" || myContext.userContext.role === "ADMIN")) {
        return (
            <>
                <div className={"my-4 d-flex justify-content-between align-items-center"}>
                    <div className="d-flex align-items-center">
                        <h1>Ingredientes</h1>
                        <Link className="btn btn-success ms-3" to={"/ingredientes/nuevo"}>Nuevo</Link>
                    </div>

                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Buscar ingredientes..."
                            value={busqueda}
                            onChange={filtrar}
                        />
                        <Button>
                            <Search/>
                        </Button>
                    </Form>
                </div>
                {isLoading ? <p>Loading...</p> : (
                    <IngredientsTable ingredients={ingredientesFiltrados}/>
                )}
            </>
        );
    }
    return (
        <Navigate to={"/"}/>
    )
};

export default IngredientsPage;