import {Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from "../../assets/el_buen_sabor.png"
import {ClientProduct} from "../../models/products/client-product.ts";

const Logo = (props: { productsChange: (products: ClientProduct[] | undefined) => void }) => {
    return (
        <>
            <Link className="navbar-brand py-0 me-0" to="/" onClick={() => props.productsChange(undefined)}>
                <Navbar.Brand className="me-0 me-md-2">
                    <img className="logo" alt="El Buen Sabor Logo" src={logo} height="60"/>
                </Navbar.Brand>
            </Link>
        </>
    );
};

export default Logo;
