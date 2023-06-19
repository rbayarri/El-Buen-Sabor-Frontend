import { Button, Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { globalContext } from "../../routes/AppRoutes";
import { useContext } from "react"
import {useMediaQuery} from "react-responsive";

const SearchForm = () => {

  const searchFormContext = useContext(globalContext);

  const isSmallScreen = useMediaQuery({ maxWidth: 480 });

  if ((!searchFormContext.userContext.authenticated || searchFormContext.userContext.role === "USER") && !isSmallScreen) {
    return (
      <>
        <Form className="d-flex position-relative w-100">
          <Form.Control type="search" placeholder="Buscar productos..." aria-label="Buscar productos..." className="" />
          <Button variant="" className="position-absolute" style={{ right: 0 }}><Search /></Button>
        </Form>
      </>
    )
  }
  return <></>
};

export default SearchForm;
