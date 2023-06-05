import React, { useEffect, useState } from "react";
import listaDeProductos from "../../productos.json";
import Product from "../../models/producto";
import SearchForm from "../SearchForm";
import { Button, Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export const LISTA_PRODUCTOS: Product[] = listaDeProductos.products;
export default function ListadoProductos() {
  const [busqueda, setBusqueda] = useState<string>("");
  const navigate = useNavigate();
  const [productos, setProductos] = useState<Product[]>([]);

  useEffect(() => {
    const productosFiltrados = LISTA_PRODUCTOS.filter((prod) =>
      prod.name.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProductos(productosFiltrados);
  }, [busqueda]);

  const EditarProducto = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <div>
        <div style={{ marginLeft: "100px" }} className="text-white-50 bg-dark">
          Adm/Cocinero
        </div>
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginLeft: "100px", fontSize: "35px" }}>
              <strong>Productos</strong>
            </p>
            <div style={{ marginLeft: "3rem" }}>
              <Button
                variant="success"
                onClick={() => navigate("/product/new")}
              >
                Nuevo
              </Button>
            </div>
          </div>
          <div>
            <Form className="d-flex">
              <Form.Control
                type="search"
                value={busqueda}
                placeholder="Buscar productos..."
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <Button>
                <Search />
              </Button>
            </Form>
          </div>
        </div>

        <div style={{ marginLeft: "100px" }}>
          <table className="table">
            <thead style={{ textAlign: "center" }}>
              <tr className="table-dark">
                <th scope="col">Nombre</th>
                <th scope="col">Rubro</th>
                <th scope="col">Tiempo de preparacion</th>
                <th scope="col">Precio de venta</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {productos.map((producto, index) => (
                <tr key={index}>
                  <td scope="row">{producto.name}</td>
                  <td>{producto.category.name}</td>
                  <td style={{ textAlign: "center" }}>
                    {producto.cookingTime}
                  </td>
                  <td>{producto.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={
                        {
                          "--bs-btn-padding-y": ".25rem",
                          "--bs-btn-padding-x": ".9rem",
                          "--bs-btn-font-size": ".75rem",
                        } as any
                      }
                      onClick={() => EditarProducto(producto.id)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button type="button" className="btn btn-outline-primary">
              VER MÁS
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
