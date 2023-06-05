import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ingredient from "../../models/ingredient";
import { LISTA_INGREDIENTES } from "./ListadoIngredientes";

const ingre: ingredient = {
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
export default function Ingrediente() {
  const { id } = useParams();
  const [ingr, setIngredient] = useState<ingredient>(ingre);

  useEffect(() => {
    if (id !== undefined) {
      const ingre1 = LISTA_INGREDIENTES.find((i) => i.id === parseInt(id));

      if (ingre1 !== undefined) {
        setIngredient(ingre1);
      }
    }
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setIngredient((prevIngr) => ({ ...prevIngr, [name]: value }));
  };

  return (
    <div>
      <div style={{ textAlign: "center", fontSize: "30px", marginTop: "30px" }}>
        <strong> Ingrediente </strong>
      </div>
      <div style={{ maxWidth: "400px", margin: "auto" }}>
        <form>
          <div className="mb-3">
            <input
              name="id"
              value={ingr.id}
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
              value={ingr.name}
              onChange={handleInputChange}
              type="text"
              className="form-control form-control-sm"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
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
            >
              <option>Seleccione rubro</option>
              {LISTA_INGREDIENTES.map((rubro) => (
                <option
                  selected={
                    rubro.category.name === ingr.category.name ? true : false
                  }
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
              Stock Minimo
            </label>
            <input
              value={ingr.minimumStock}
              onChange={handleInputChange}
              name="minimumStock"
              type="text"
              className="form-control form-control-sm"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Stock Actual
            </label>
            <input
              value={ingr.currentStock}
              onChange={handleInputChange}
              name="currentStock"
              type="text"
              className="form-control form-control-sm"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Unidad de medida
            </label>
            <input
              value={ingr.measurementUnit}
              onChange={handleInputChange}
              name="measurementUnit"
              type="text"
              className="form-control form-control-sm"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              disabled={ingr.id ? true : false}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="labelRubro" className="form-label">
              Baja
            </label>
            <select
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option selected>Seleccione una opcion</option>
              <option value="2">Si</option>
              <option value="1">No</option>
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="danger" size="sm" style={{ marginRight: "10px" }}>
              Cancelar
            </Button>

            {ingr.id ? (
              <Button variant="dark" size="sm">
                Modificar
              </Button>
            ) : (
              <Button variant="success" size="sm">
                Nuevo
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
