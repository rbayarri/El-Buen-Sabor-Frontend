import { Container, Navbar, Row } from "react-bootstrap";
import { DropDownMenu } from "../components/userDropDown";
//import { LoginButton } from './LoginButton';
import "./navigation.css"
import SearchForm from "./SearchForm";
import Logo from "./Logo";
import CartButton from "./CartButton";

export const Navigation = () => {

    return (
        <Container fluid>
            <Row>
                <Navbar expand="lg" className="border-bottom border-opacity-50 bg-secondary">
                    <Container fluid="lg" className="">
                        <div className="d-flex justify-content-start align-items-center">
                            <Logo />
                            <SearchForm />
                        </div>
                        <div className="d-flex">
                            {/* Agregar validación de rol, en lugar de carritos, irían las opciones */}



                            {/*Carrito + Notificacion*/}
                            <CartButton />

                            
                            {/*Elementos a colapsar */}
                            {/* En caso que esté logueado y sea empleado
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <ul>
                                <li>Opción 1</li>
                                <li>Opción 2</li>
                                <li>Opcion 3</li>
                            </ul>
                        </Navbar.Collapse>
                        */}
                            {/*isAuthenticated ? <DropDownMenu /> : <LoginButton />*/}
                        </div>
                    </Container>
                </Navbar>
            </Row>
        </Container>
    );
};
