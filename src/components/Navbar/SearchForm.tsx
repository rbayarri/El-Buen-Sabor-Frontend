import {Button, Form} from "react-bootstrap";
import {Search} from "react-bootstrap-icons";
import {globalContext} from "../../routes/AppRoutes";
import {useContext, useState} from "react"
import {useMediaQuery} from "react-responsive";
import {ClientProduct} from "../../models/products/client-product.ts";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {useNavigate} from "react-router-dom";

const SearchForm = (props: { productsChange: (products: ClientProduct[]) => void }) => {

    const searchFormContext = useContext(globalContext);
    const [search, setSearch] = useState("");
    const isSmallScreen = useMediaQuery({maxWidth: 480});
    const productsChange = props.productsChange;
    const navigate = useNavigate();

    const getProductsByName = async () => {
        if (search) {
            const api = settings.api.home.findProductsByName;
            console.log(api)
            const response = await doRequest<ClientProduct[]>({
                path: api.path + `?name=${search}`,
                method: api.method
            })
            if (response) {
                productsChange(response);
                navigate("/");
            }
        }
    }

    if ((!searchFormContext.userContext.authenticated || searchFormContext.userContext.role === "USER") && !isSmallScreen) {
        return (
            <>
                <Form className="d-flex position-relative w-100" onSubmit={e => {
                    e.preventDefault();
                    getProductsByName();
                }}>
                    <Form.Control type="search" placeholder="Buscar productos..." aria-label="Buscar productos..."
                                  className="" onChange={(e) => {
                                      e.preventDefault();
                                      setSearch(e.target.value);
                                  }}/>
                    <Button variant="" className="position-absolute" style={{right: 0}}
                            onClick={getProductsByName}><Search/></Button>
                </Form>
            </>
        )
    }
    return <></>
};

export default SearchForm;
