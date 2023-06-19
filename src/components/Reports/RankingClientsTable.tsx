import {RankingClient} from "../../models/reports/ranking-client.ts";
import {Link} from "react-router-dom";

const RankingClientsTable = (props: { clients: RankingClient[] }) => {

    const clients = props.clients;

    return (
        <table className="table table-sm table-responsive table-striped w-75 small mt-2">
            <thead className="table-dark">
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th className="text-center">Cantidad de pedidos</th>
                <th className="text-center">Importe total</th>
                <th className="text-center">Detalle</th>
            </tr>
            </thead>
            <tbody>
            {clients.map((c, i) => (
                <tr key={i}>
                    <td>{c.name}</td>
                    <td>{c.lastName}</td>
                    <td className="text-center">{c.quantity}</td>
                    <td className="text-center">{c.total.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS"
                    })}</td>
                    <td className="text-center"><Link to={`/rankingClientes/${c.id}`} className="btn btn-primary btn-sm">Ver Pedidos</Link></td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default RankingClientsTable;