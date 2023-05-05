import { Button, Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { myContext } from "../../routes/AppRoutes";
import { useContext } from "react"

const SearchForm = () => {

  const searchFormContext = useContext(myContext)

  if (!searchFormContext.authenticated || searchFormContext.role === "USER") {
    return (
      <>
        {/* Formulario para buscar */}
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
