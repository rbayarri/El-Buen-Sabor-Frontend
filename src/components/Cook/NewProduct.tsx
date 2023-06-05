import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import burguerImage from "../../assets/burguer1.jpg";
import { useParams } from "react-router-dom";
import { LISTA_PRODUCTOS } from "./ListadoProductos";
import producto from "../../models/producto";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddBoxIcon from "@mui/icons-material/AddBox";

const prod: producto = {
  id: 0,
  name: "",
  category: {
    id: 0,
    name: "",
  },
  cookingTime: 0,
  price: 0,
  active: false,
};

export default function NewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState<producto>(prod);
  const [text, setText] = useState("");

  useEffect(() => {
    if (id !== undefined) {
      const prod1 = LISTA_PRODUCTOS.find((i) => i.id === parseInt(id));

      if (prod1 !== undefined) {
        setProduct(prod1);
      }
    }
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setProduct((prevProd) => ({ ...prevProd, [name]: value }));
  };

  return (
    <>
      <Row style={{ marginTop: "30px" }}>
        <Col>
          <img
            src={burguerImage}
            style={{ width: "300px", height: "200px" }}
            className="img-thumbnail"
            alt="imagenProdcuto"
          />
          <div style={{ display: "flex" }}>
            <input
              name="image"
              onChange={handleInputChange}
              type="file"
              className="form-control form-control-sm"
              id="image"
              aria-describedby="emailHelp"
              style={{ marginTop: "10px", width: "300px" }}
            />
            <AttachFileIcon style={{ marginTop: "15px" }}></AttachFileIcon>
          </div>
        </Col>
        <Col>
          <form>
            <div className="mb-3">
              <input
                name="id"
                value={product.id}
                type="hidden"
                className="form-control form-control-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Nombre
              </label>
              <input
                name="name"
                value={product.name}
                onChange={handleInputChange}
                type="text"
                className="form-control form-control-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                style={{ width: "100%" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="labelRubro" className="form-label">
                Rubro
              </label>
              <select
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
                onChange={handleInputChange}
                style={{ width: "100%" }}
              >
                <option>Seleccione rubro</option>
                {LISTA_PRODUCTOS.map((rubro) => (
                  <option
                    selected={rubro.category.name === product.category.name}
                    key={rubro.category.id}
                    value={rubro.category.id}
                  >
                    {rubro.category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Descripcion
              </label>
              <input
                onChange={handleInputChange}
                name="descripcion"
                type="text"
                className="form-control form-control-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                style={{ width: "100%" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Tiempo de cocina
              </label>
              <input
                value={product.cookingTime}
                onChange={handleInputChange}
                name="cookingTime"
                type="text"
                className="form-control form-control-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                style={{ width: "100%" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Precio de venta
              </label>
              <input
                value={product.price}
                onChange={handleInputChange}
                name="price"
                type="text"
                className="form-control form-control-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                style={{ width: "100%" }}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="labelRubro" className="form-label">
                Baja
              </label>
              <select
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
                style={{ width: "100%" }}
              >
                <option>Seleccione una opcion</option>
                <option value="2">Si</option>
                <option value="1">No</option>
              </select>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="danger" size="sm" style={{ marginLeft: "30px" }}>
                Cancelar
              </Button>
              {product.id ? (
                <Button variant="dark" size="sm" style={{ marginLeft: "60px" }}>
                  Modificar
                </Button>
              ) : (
                <Button variant="success" size="sm">
                  Nuevo
                </Button>
              )}
            </div>
          </form>
        </Col>
        <Col>
          <div>
            <label htmlFor="myTextArea">Ingredientes</label>
            <AddBoxIcon style={{ marginLeft: "10px" }}></AddBoxIcon>
          </div>
          <table className="table" style={{ marginTop: "10px" }}>
            <thead style={{ textAlign: "center" }}>
              <tr className="table-dark">
                <th scope="col">Nombre</th>
                <th scope="col">Unidad medida</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Costo</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              <tr>
                <td scope="row">aaa</td>
                <td>aaa</td>
                <td>aaa</td>
                <td>aaa</td>
              </tr>
              <tr>
                <td scope="row">aaa</td>
                <td>aaa</td>
                <td>aaa</td>
                <td>aaa</td>
              </tr>
            </tbody>
          </table>
          <div>
            <label htmlFor="myTextArea">
              {" "}
              <strong>Costo total:</strong>
            </label>
          </div>
          <div style={{ marginTop: "30px" }}>
            <label htmlFor="myTextArea">Receta</label>
          </div>
          <textarea id="myTextArea" value={text} rows={6} cols={60} />
        </Col>
      </Row>
    </>
  );
}
