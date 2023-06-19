import {Profit} from "../../models/reports/profit.ts";

const ProfitTable = (props: { profit: Profit }) => {
    const profit = props.profit;

    return (
        <table className="table table-sm table-responsive table-striped w-75 small mt-2">
            <thead className="table-dark">
            <tr>
                <th>Concepto</th>
                <th>Importe</th>
            </tr>
            </thead>
            <tbody>
            <tr key={0}>
                <td>Ingresos</td>
                <td>{profit.profits.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}</td>
            </tr>
            <tr key={1}>
                <td>Costos</td>
                <td>{profit.costs.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}</td>
            </tr>
            <tr key={2}>
                <td>Resultados por tenencia</td>
                <td>{profit.holdingResults.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}</td>
            </tr>
            <tr key={3} className={"fw-bold"}>
                <td>Ganancia/Pérdida</td>
                <td>{(profit.profits - profit.costs + profit.holdingResults).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS"
                })}</td>
            </tr>
            </tbody>
        </table>
    )
        ;
};

export default ProfitTable;