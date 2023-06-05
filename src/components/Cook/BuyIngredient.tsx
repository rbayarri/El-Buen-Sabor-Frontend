import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ingredient from "../../models/ingredient";
import { LISTA_INGREDIENTES } from "./ListadoIngredientes";

const ingre: ingredient | undefined = {
  id: 0,
  name: "",
  category: {
    id: 0,
    name: "",
  },
  minimumStock: 0,
  measurementUnit: "",
  active: false,
  currentStock: 0,
  lastCost: 0,
};
export default function BuyIngredient() {
  const { id } = useParams();
  const [ingr, setIngredient] = useState<ingredient>(ingre);
  const [cantidad, setCantidad] = useState<number>(0);
  const [costoUnitario, setCostoUnitario] = useState<number>(0);
  const [costoTotal, setCostoTotal] = useState<number>(0);

  useEffect(() => {
    if (id !== undefined) {
      const ingre1 = LISTA_INGREDIENTES.find((i) => i.id === parseInt(id));

      if (ingre1 !== undefined) {
        setIngredient(ingre1);
      }
    }
  }, []);

  useEffect(() => {
    setCostoTotal(cantidad * costoUnitario);
  }, [cantidad, costoUnitario]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "cantidad") {
      setCantidad(parseInt(value));
    } else if (name === "costoUnitario") {
      setCostoUnitario(parseInt(value));
    }
  };

  const costoUnitarioDisplay = `$${costoUnitario}`;

  return (
    <div>
      <div style={{ textAlign: "center", fontSize: "30px", marginTop: "30px" }}>
        <strong> Compra de Ingrediente </strong>
      </div>
      <div style={{ maxWidth: "400px", margin: "auto" }}>
        <form>
          <div className="mb-3">
            <input
              name="id"
              value={ingr.id}
              type="hidden"
              className="form-control form-control-sm"
              id="idIngredient"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="labelIngredient" className="form-label">
              Ingrediente
            </label>
            <div style={{ display: "flex" }}>
              <select
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
                onChange={handleInputChange}
                value={ingr.id}
                style={{ width: "300px" }}
              >
                <option>Seleccione Ingrediente</option>
                {LISTA_INGREDIENTES.map((rubro) => (
                  <option key={rubro.id} value={rubro.id}>
                    {rubro.name}
                  </option>
                ))}
              </select>
              <Link to={"/ingredient/new"}>
                <Button
                  variant="success"
                  style={
                    {
                      "--bs-btn-padding-y": ".25rem ",
                      "--bs-btn-padding-x": ".7rem",
                      "--bs-btn-font-size": ".75rem",
                      width: "5rem",
                      marginLeft: "30px",
                    } as any
                  }
                >
                  Nuevo
                </Button>
              </Link>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="labelCantidad" className="form-label">
              Cantidad
            </label>
            <input
              name="cantidad"
              onChange={handleInputChange}
              type="text"
              className="form-control form-control-sm"
              id="inputCantidad"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="labelCostoUnitario" className="form-label">
              Costo Unitario
            </label>

            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                onChange={handleInputChange}
                name="costoUnitario"
                type="text"
                className="form-control form-control-sm"
                id="inputCostoUnitario"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="labelCosto" className="form-label">
              Costo Total
            </label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                disabled
                value={costoTotal}
                type="text"
                className="form-control form-control-sm"
                id="inputCostoTotal"
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="danger" size="sm" style={{ marginRight: "10px" }}>
              Cancelar
            </Button>

            <Button variant="dark" size="sm">
              Registrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
