import { Button, NavDropdown } from "react-bootstrap";
import { Power, PersonFill } from "react-bootstrap-icons";
import { myContext } from "../../routes/AppRoutes";
import { useContext } from "react";
import { Link } from "react-router-dom";

export const DropDownMenu = () => {

    const myDropDownMenuContext = useContext(myContext)

    const emptyUser = {
        name: "",
        lastName: "",
        picture: "",
        role: "USER",
        authenticated: false
    }

    const handleLogout = () => {
        myDropDownMenuContext.onChange(emptyUser)
        document.cookie = "USERJWT=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; sameSite=lax;"
    }

    return (
        <div className="start-0 d-flex">
            {/*Normal*/}
            <Button variant="outline-primary" className="profile-btn px-0 py-1 me-2">
                <NavDropdown drop="down" title={<><PersonFill size="28" /> {myDropDownMenuContext.name}</>} id="navbarScrollingDropdown" className="navUserMenuContainer p0-2">
                    <NavDropdown.ItemText className="text-muted text-center">{myDropDownMenuContext.name + " " + myDropDownMenuContext.lastName}</NavDropdown.ItemText>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/user/perfil">Mi Perfil</NavDropdown.Item>
                    {myDropDownMenuContext.role === "USER" && <NavDropdown.Item as={Link} to="/user/pedidos">Mis Pedidos</NavDropdown.Item>}
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => handleLogout()} className="text-danger"><Power size={20} color={"red"} className="me-2" />Cerrar Sesión</NavDropdown.Item>
                </NavDropdown>
            </Button>
        </div>
    )
}