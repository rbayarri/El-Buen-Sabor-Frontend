import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {globalContext} from '../../routes/AppRoutes';
import {useContext} from "react"
import {Link} from 'react-router-dom';

const NavbarOptions = () => {

    const myContext = useContext(globalContext)

    const chef = () => {
        return (
            <NavDropdown title="Cocina" id="basic-nav-dropdown" className="me-3">
                {myContext.userContext.role === "CHEF" && <NavDropdown.Item as={Link} to="/cocina/pedidos" key="1">Pedidos a Preparar</NavDropdown.Item>}
                <NavDropdown.Item as={Link} to="/ingredientes/compra/nuevo" key="2">Compra de
                    Ingredientes</NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item as={Link} to="/rubros/productos" key="3">Rubro Productos</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/rubros/ingredientes" key="4">Rubro Ingredientes</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/productos" key="5">Productos</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/ingredientes" key="6">Ingredientes</NavDropdown.Item>
            </NavDropdown>
        )
    }

    const cashier = () => {
        return (
            <Link to="/cajero/pedidos" className='nav-link me-3'>Listado de Pedidos</Link>
        )
    }

    const delivery = () => {
        return (
            <Link to="/delivery/pedidos" className='nav-link me-3'>Pedidos a Entregar</Link>
        )
    }

    const admin = () => {
        return (
            <>
                <NavDropdown title="Informes" id="basic-nav-dropdown" className="me-3">
                    <NavDropdown.Item as={Link} to="/rankingProductos" key="1">Ranking de productos</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/rankingClientes" key="2">Ranking de clientes</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/ganancias" key="3">Informe ganancias</NavDropdown.Item>
                </NavDropdown>
                <Link to="/usuarios" className='nav-link me-3'>Usuarios</Link>
                {chef()}
            </>
        )
    }

    const optionsToRender = (): React.ReactNode => {
        switch (myContext.userContext.role) {
            case "CASHIER":
                return cashier()

            case "CHEF":
                return chef()

            case "DELIVERY":
                return delivery()

            case "ADMIN":
                return admin()
        }
    }

    return (
        <Navbar.Collapse id="navbarScroll">
            <Nav className='ms-auto ps-3'>
                {optionsToRender()}
            </Nav>
        </Navbar.Collapse>
    )
}

export default NavbarOptions;
