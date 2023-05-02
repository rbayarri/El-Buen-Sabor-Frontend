import { Button, Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const SearchForm = () => {
  return (
    <>
      {/* Formulario para buscar */}
      <Form className="d-flex">
        <Form.Control type="search" placeholder="Buscar productos..." aria-label="Buscar productos..." />
        <Button><Search /></Button>
      </Form>
    </>
  );
};

export default SearchForm;
