import {NavDropdown} from "react-bootstrap";
import {Person, Bag, Shop, Power, Receipt} from "react-bootstrap-icons";

export const DropDownMenu = () =>{

    const handleLogout = () => {
        return;
    }

    return (
        <div className="start-0">
            {/*Normal*/}
            <NavDropdown drop="down" title={/*user?.given_name*/"Renzo por ahora"} id="navbarScrollingDropdown" className="navUserMenuContainer p-2">
                <NavDropdown.Item href="#action1"><Person size={20} className="mx-2 align-content-center"/>Mi Perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action2"><Bag size={20} className="mx-2"/>Mi Pedido</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action3"><Receipt size={20} className="mx-2"/>Historial de Pedidos</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action3"><Shop size={20} className="mx-2"/>Trabajo</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleLogout()} className="text-danger"><Power size={20} color={"red"} className="mx-2"/>Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
        </div>
    )
}