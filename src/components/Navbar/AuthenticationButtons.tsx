import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const AuthenticationButtons = () => {
  
  return (
    <>
      <Link to="/login" className="me-2"><Button variant="outline-primary">Ingresar</Button></Link>
      <Link to="/signup" className="d-none d-lg-block"><Button variant="primary">Registrarse</Button></Link>
    </>
  );
};

export default AuthenticationButtons;
