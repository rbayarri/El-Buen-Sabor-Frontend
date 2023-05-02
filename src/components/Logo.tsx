import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../assets/el_buen_sabor.png"

const Logo = () => {
  return (
    <>
      {/* Logo */}
      <Link className="navbar-brand" to="/">
        <Navbar.Brand>
          <img className="logo" alt="El Buen Sabor Logo" src={logo} height="60" />
        </Navbar.Brand>
      </Link>
    </>
  );
};

export default Logo;
