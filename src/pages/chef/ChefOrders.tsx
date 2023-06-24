import {useContext, useEffect, useState} from "react";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Order} from "../../models/order.ts";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import swal from "sweetalert";

export default function ChefOrders() {

    const myContext = useContext(globalContext);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getOrders = async () => {

        const api = settings.api.orders.chef;
        const response = await doRequest<Order[]>({
            path: api.path,
            method: api.method,
            jwt: myContext.userContext.jwt
        });
        if (response) {
            setOrders(response);
            setIsLoading(false);
        }
    }

    const toReady = async (id: string) => {
        const api = settings.api.orders.toReady;
        const response = await doRequest<Order>({
            path: api.path + '/' + id,
            method: api.method,
            jwt: myContext.userContext.jwt
        });
        if (response) {
            await swal("Order pasada a lista", "", "success");
            getOrders();
        }
    }

    const addMinutes = async (id: string) => {
        const api = settings.api.orders.addMinutes;
        const response = await doRequest<Order>({
            path: api.path + '/' + id,
            method: api.method,
            jwt: myContext.userContext.jwt
        });
        if (response) {
            await swal("Se agregaron 10 minutos", "", "success");
            getOrders();
        }
    }

    useEffect(() => {
        getOrders();
    }, []);


    return (
        <>
            {isLoading ? <h1>Loading...</h1> :
                <>
                    <h1 className={"fs-2 mb-3"}>Pedidos a Preparar</h1>
                    <Table striped bordered hover>
                        <thead style={{textAlign: "center"}}>
                        <tr className="table-dark">
                            <th>Pedido</th>
                            <th>Fecha y Hora</th>
                            <th>Tiempo de preparacion</th>
                            <th>Detalles</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody style={{textAlign: "center"}}>
                        {
                            orders.map((ord, index) => (
                                <tr key={index}>
                                    <td>{ord.id.split('-')[0].toUpperCase()}</td>
                                    <td> {new Date(ord.dateTime).toLocaleDateString("es-AR", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric"
                                        }) + " - " +
                                        new Date(ord.dateTime).toLocaleTimeString("es-AR", {
                                            hour12: false
                                        })
                                    }</td>
                                    <td>{ord.cookingTime}</td>
                                    <td>
                                        <Link className='btn btn-primary btn-sm' to={`/pedidos/${ord.id}`}>
                                            Ver Detalle
                                        </Link>
                                    </td>
                                    <td>
                                        <Button variant='success' size="sm" onClick={() => toReady(ord.id)}>
                                            Listo
                                        </Button>
                                        <Button className='ms-2 ' variant='danger' size="sm"
                                                onClick={() => addMinutes(ord.id)}>
                                            <TimerOutlinedIcon/>
                                            + 10 minutos
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </>
            }
        </>
    )
}
