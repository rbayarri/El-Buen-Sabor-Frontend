import { useEffect, useState } from "react";
import listaDeIngredientes from "../../ingredientes.json";
import Ingredient from "../../models/ingredient";
import { Button, Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export const LISTA_INGREDIENTES: Ingredient[] = listaDeIngredientes.ingredients;
export default function ListadoIngredientes() {
  const [busqueda, setBusqueda] = useState<string>("");
  const navigate = useNavigate();
  const [ingredientes, setIngredientes] = useState<Ingredient[]>([]);

  useEffect(() => {
    const ingredientesFiltrados = LISTA_INGREDIENTES.filter((ingr) =>
      ingr.name.toLowerCase().includes(busqueda.toLowerCase())
    );
    setIngredientes(ingredientesFiltrados);
  }, [busqueda]);

  const EditarIngrediente = (id: number) => {
    navigate(`/ingredient/${id}`);
  };

  const ComprarIngrediente = (id: number) => {
    navigate(`/ingredient/buy/${id}`);
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
              <strong>Ingredientes</strong>
            </p>
            <div style={{ marginLeft: "3rem" }}>
              <Button
                variant="success"
                onClick={() => navigate("/ingredient/new")}
              >
                Nuevo
              </Button>
            </div>
          </div>
          <div>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Buscar ingredientes..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <Button>
                <Search />
              </Button>
            </Form>
          </div>
        </div>

        <div style={{ marginLeft: "100px" }}>
          <table className="table" style={{ textAlign: "center" }}>
            <thead>
              <tr className="table-dark">
                <th scope="col">Nombre</th>
                <th scope="col">Rubro</th>
                <th scope="col">Costo</th>
                <th scope="col">Stock Minimo</th>
                <th scope="col">Stock Actual</th>
                <th scope="col">Diferencia</th>
                <th scope="col">Unidad de Medida</th>
                <th scope="col">Accion</th>
              </tr>
            </thead>
            <tbody>
              {ingredientes.map((ingr, index) => (
                <tr
                  key={index}
                  className={
                    ingr.currentStock - ingr.minimumStock < 1
                      ? "bg-danger"
                      : ingr.currentStock - ingr.minimumStock < 25
                      ? "bg-warning"
                      : ""
                  }
                >
                  <td scope="row">{ingr.name}</td>
                  <td>{ingr.category.name}</td>
                  <td>{ingr.lastCost}</td>
                  <td>{ingr.minimumStock}</td>
                  <td>{ingr.currentStock}</td>
                  <td>{ingr.currentStock - ingr.minimumStock}</td>
                  <td>{ingr.measurementUnit}</td>
                  <td>
                    <Button
                      variant="primary"
                      style={
                        {
                          "--bs-btn-padding-y": ".25rem",
                          "--bs-btn-padding-x": ".7rem",
                          "--bs-btn-font-size": ".75rem",
                          marginRight: "1rem",
                          width: "5rem",
                        } as any
                      }
                      onClick={() => EditarIngrediente(ingr.id)}
                    >
                      Editar
                    </Button>

                    <Button
                      variant="success"
                      style={
                        {
                          "--bs-btn-padding-y": ".25rem ",
                          "--bs-btn-padding-x": ".7rem",
                          "--bs-btn-font-size": ".75rem",
                          width: "5rem",
                        } as any
                      }
                      onClick={() => ComprarIngrediente(ingr.id)}
                    >
                      Comprar
                    </Button>
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
