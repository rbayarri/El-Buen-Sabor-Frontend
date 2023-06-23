import Ingredient from "../../models/ingredient";
import {Link} from "react-router-dom";
import {getMeasurementUnits} from "../../lib/measurement-unit.ts";

export default function IngredientsTable(props: { ingredients: Ingredient[] }) {

    const {ingredients} = props;

    return (
        <>
            {ingredients.length === 0 ? <p>No hay registros</p> : (
                <table className="table table-sm table-responsive small" style={{textAlign: "center"}}>
                    <thead>
                    <tr className="table-dark">
                        <th>Nombre</th>
                        <th>Rubro</th>
                        <th>Costo</th>
                        <th>Stock Minimo</th>
                        <th>Stock Actual</th>
                        <th>Diferencia</th>
                        <th>Unidad de Medida</th>
                        <th>Accion</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ingredients.map((ingr, index) => (
                        <tr
                            key={index}
                            className={
                                ingr.currentStock - ingr.minimumStock < 0
                                    ? "bg-danger"
                                    : ingr.currentStock - ingr.minimumStock < 5
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
                            <td>{getMeasurementUnits(ingr.measurementUnit)?.nombre}</td>
                            <td>
                                <Link to={`/ingredientes/${ingr.id}`}
                                      className="btn btn-primary"
                                      style={
                                          {
                                              "--bs-btn-padding-y": ".25rem",
                                              "--bs-btn-padding-x": ".7rem",
                                              "--bs-btn-font-size": ".75rem",
                                              marginRight: "1rem",
                                              width: "5rem",
                                          } as any
                                      }>Editar</Link>
                                <Link to={`/ingredientes/compra/${ingr.id}`}
                                      className="btn btn-success"
                                      style={
                                          {
                                              "--bs-btn-padding-y": ".25rem ",
                                              "--bs-btn-padding-x": ".7rem",
                                              "--bs-btn-font-size": ".75rem",
                                              width: "5rem",
                                          } as any
                                      }>Comprar</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
}
