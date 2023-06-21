import {Container, Navbar} from "react-bootstrap";
import {DropDownMenu} from "./DropDownMenu.tsx";
import "./navigation.css"
import SearchForm from "./SearchForm";
import Logo from "./Logo";
import CartButton from "./CartButton";
import {useContext} from "react";
import {globalContext} from "../../routes/AppRoutes";
import AuthenticationButtons from "./AuthenticationButtons";
import NavbarOptions from "./NavbarOptions";
import {useMediaQuery} from "react-responsive";
import {ClientProduct} from "../../models/products/client-product.ts";

export const Navigation = (props: { productsChange: (products: ClientProduct[] | undefined) => void }) => {

    const myContext = useContext(globalContext)
    const isSmallScreen = useMediaQuery({maxWidth: 992});
    const productsChange = props.productsChange;


    return (
        <Navbar expand="lg" className="border-bottom border-opacity-50 py-0 bg-light" fixed="top">
            <Container fluid="lg" className="px-0">
                <div
                    className={`d-flex justify-content-start align-items-center ${(!myContext.userContext.authenticated || myContext.userContext.role === "USER") ? "col col-sm-7" : ""}`}>
                    <Logo productsChange={productsChange}/>
                    <SearchForm productsChange={productsChange}/>
                </div>

                {!isSmallScreen ?
                    <>
                        <NavbarOptions/>
                        <div className="d-flex align-items-center ms-auto">
                            <CartButton/>
                            {myContext.userContext.authenticated ? <DropDownMenu/> : <AuthenticationButtons/>}
                        </div>
                    </> :
                    <>
                        <div className="d-flex align-items-center ms-auto">
                            <CartButton/>
                            {myContext.userContext.authenticated ? <DropDownMenu/> : <AuthenticationButtons/>}
                        </div>
                        <Navbar.Toggle
                            className={(!myContext.userContext.authenticated || myContext.userContext.role === "USER") ? "d-none me-2" : "me-2"}
                            aria-controls="navbarScroll"/>
                        {myContext.userContext.role !== "USER" && <NavbarOptions/>}
                    </>}
            </Container>
        </Navbar>
    );
};


