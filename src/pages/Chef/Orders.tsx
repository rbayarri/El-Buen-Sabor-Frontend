import React, { useContext, useEffect, useState } from "react";
import { settings } from "../../lib/settings";
import { doRequest } from "../../lib/fetch";
import { globalContext } from "../../routes/AppRoutes";
import { Orders } from "../../models/orders";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function OrdersTable() {

    const myContext = useContext(globalContext);
    const [orders, setOrders] = useState<Orders[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getOrders = async () => {

        const api = settings.api.orders.chef;
        const response = await doRequest<Orders[]>({ path: api.path, method: api.method, jwt: myContext.jwt });
        if (response) {
            setOrders(response);
            setIsLoading(false);
        }
    }

    useEffect((() => {
        getOrders();
    }), []);

    console.log(orders)

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Pedido</th>
                        <th>Fecha y Hora</th>
                        <th>Tiempo de preparación</th>
                        <th>Detalles</th>
                        <th>Acciones / Nuevo Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(ord => (
                            <tr>
                                <td>{ord.id}</td>
                                <td>{ord.dateTime}</td>
                                <td>{ord.cookingTime}</td>
                                <td>
                                    <Link className='btn btn-outline-secondary' style={{ placeItems: 'center', display: 'grid', width: '200px' }} to={`/detallepedido/${ord.Product?.id}`}>
                                        Ver Detalle
                                    </Link>
                                </td>
                                <td>
                                    <Link className='btn btn-outline-secondary' style={{ placeItems: 'center', display: 'grid', width: '200px' }} to={''}>
                                        Listo
                                    </Link>
                                    <Link className='btn btn-outline-secondary' style={{ placeItems: 'center', display: 'grid', width: '200px' }} to={''}>
                                    <i className="fa-regular fa-stopwatch fa-xs"></i>
                                        + 10 minutos
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}