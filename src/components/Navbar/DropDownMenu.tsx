import {Button, NavDropdown} from "react-bootstrap";
import {PersonFill, Power} from "react-bootstrap-icons";
import {emptyUser, globalContext} from "../../routes/AppRoutes";
import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {deleteTokenCookie} from "../../lib/cookies.ts";

export const DropDownMenu = () => {

    const myContext = useContext(globalContext)
    const navigate = useNavigate();

    const handleLogout = () => {
        const newEmptyUser = emptyUser;
        newEmptyUser.onChange = myContext.userContext.onChange;
        if (myContext.userContext.onChange) {
            myContext.userContext.onChange(newEmptyUser);
        }
        deleteTokenCookie();
        navigate("/");
    }

    return (
        <div className="start-0 d-flex">
            {/*Normal*/}
            <Button variant="outline-primary" className="profile-btn px-0 py-1 me-2" style={{width: "fit-content"}}>
                <NavDropdown drop="down" title={<><PersonFill size="28"/> {myContext.userContext.name}</>}
                             id="navbarScrollingDropdown" className="navUserMenuContainer p0-2">
                    <NavDropdown.ItemText
                        className="text-muted text-center">{myContext.userContext.name + " " + myContext.userContext.lastName}</NavDropdown.ItemText>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item as={Link} to="/cuenta">Mi Perfil</NavDropdown.Item>
                    {myContext.userContext.role === "USER" &&
                        <NavDropdown.Item as={Link} to="/pedidos">Mis Pedidos</NavDropdown.Item>}
                    <NavDropdown.Divider/>
                    <NavDropdown.Item onClick={() => handleLogout()} className="text-danger">
                        <Power size={20} color={"red"} className="me-2"/>Cerrar Sesión</NavDropdown.Item>
                </NavDropdown>
            </Button>
        </div>
    )
}