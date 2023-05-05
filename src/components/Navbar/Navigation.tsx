import { Container, Navbar } from "react-bootstrap";
import { DropDownMenu } from "./userDropDown";
import "./navigation.css"
import SearchForm from "./SearchForm";
import Logo from "./Logo";
import CartButton from "./CartButton";
import { useContext } from "react";
import { myContext } from "../../routes/AppRoutes";

import AuthenticationButtons from "./AuthenticationButtons";
import NavbarOptions from "./NavbarOptions";
import { useMediaQuery } from "react-responsive";

export const Navigation = () => {

    const myNavigationContext = useContext(myContext)
    const isSmallScreen = useMediaQuery({ maxWidth: 992 });

    return (
        <Navbar expand="lg" className="border-bottom border-opacity-50 py-0 bg-light" fixed="top">
            <Container fluid="lg" className="px-0">
                <div className={`d-flex justify-content-start align-items-center ${(!myNavigationContext.authenticated || myNavigationContext.role === "USER") ? "col-7" : ""}`}>
                    <Logo />
                    <SearchForm />
                </div>

                {!isSmallScreen ?
                    <>
                        <NavbarOptions />
                        <div className="d-flex align-items-center">
                            <CartButton />
                            {myNavigationContext.authenticated ? <DropDownMenu /> : <AuthenticationButtons />}
                        </div>
                    </> :
                    <>
                        <div className="d-flex align-items-center ms-auto">
                            <CartButton />
                            {myNavigationContext.authenticated ? <DropDownMenu /> : <AuthenticationButtons />}
                        </div>
                        <Navbar.Toggle className={(!myNavigationContext.authenticated || myNavigationContext.role === "USER") ? "d-none me-2" : "me-2"} aria-controls="navbarScroll" />
                        <NavbarOptions />
                    </>}
            </Container>
        </Navbar>
    );
};


