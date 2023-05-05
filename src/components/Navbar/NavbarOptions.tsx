import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { myContext } from '../../routes/AppRoutes';
import { useContext } from "react"
import { Link } from 'react-router-dom';

const NavbarOptions = () => {

  const myNavbarOptionsContext = useContext(myContext)

  const chef = () => {
    return (
      <NavDropdown title="Cocina" id="basic-nav-dropdown" className="me-3">
        <NavDropdown.Item as={Link} to="/cocina/pedidos" key="1">Pedidos a Preparar</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/ingredientes/compra" key="2">Compra de Ingredientes</NavDropdown.Item>
        <NavDropdown.Divider />
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
        {cashier()}
        {/** TODO: Falta que se oculten cuando se hace click */}
        <NavDropdown title="Informes" id="basic-nav-dropdown" className="me-3">
          <NavDropdown.Item as={Link} to="/admin/ranking/productos" key="1">Ranking de productos</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/admin/ranking/clientes" key="2">Ranking de clientes</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/admin/ganancias" key="3">Informe ganancias</NavDropdown.Item>
        </NavDropdown>
        <Link to="/admin/usuarios" className='nav-link me-3'>Usuarios</Link>
        {chef()}
      </>
    )
  }

  const optionsToRender = (): React.ReactNode => {
    switch (myNavbarOptionsContext.role) {
      case "CASHIER":
        return cashier()
        break;

      case "CHEF":
        return chef()
        break;

      case "DELIVERY":
        return delivery()
        break;

      case "ADMIN":
        return admin()
        break;
    }
  }

  return (
    <>
      <Navbar.Collapse id="navbarScroll">
        <Nav className='ms-auto ps-3'>
          {optionsToRender()}
        </Nav>
      </Navbar.Collapse>
    </>
  )
}

export default NavbarOptions;
