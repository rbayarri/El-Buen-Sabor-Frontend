import { translateStatus } from "../../lib/status-translate.js";
import { Order } from "../../models/order.js";
import { Button } from "react-bootstrap";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import { Link } from "react-router-dom";
import { settings } from "../../lib/settings.js";
import { doRequest } from "../../lib/fetch.js";
import { useContext, useState } from "react";
import { globalContext } from "../../routes/AppRoutes.js";

export default function CashierOrdersTable(props: { orders: Order[] }) {
  const myContext = useContext(globalContext);
  const [orders, setOrders] = useState(props.orders);

  const toCooking = async (id: string) => {
    const api = settings.api.orders.toCooking;
    const response = await doRequest<Order>({
      path: api.path + `/${id}`,
      method: api.method,
      jwt: myContext.userContext.jwt,
    });
    if (response) {
      const newOrder = orders.find((o) => o.id === id);
      if (newOrder) {
        newOrder.status = "COOKING";
        setOrders([...orders]);
      }
    }
  };

  const toDelivery = async (id: string) => {
    const api = settings.api.orders.toDelivery;
    const response = await doRequest<Order>({
      path: api.path + `/${id}`,
      method: api.method,
      jwt: myContext.userContext.jwt,
    });
    if (response) {
      const newOrder = orders.find((o) => o.id === id);
      if (newOrder) {
        newOrder.status = "ON_THE_WAY";
        setOrders([...orders]);
      }
    }
  };

  const toReady = async (id: string) => {
    const api = settings.api.orders.toReady;
    const response = await doRequest<Order>({
      path: api.path + `/${id}`,
      method: api.method,
      jwt: myContext.userContext.jwt,
    });
    if (response) {
      const newOrder = orders.find((o) => o.id === id);
      if (newOrder) {
        newOrder.status = "READY";
        setOrders([...orders]);
      }
    }
  };

  const toDelivered = async (id: string) => {
    const api = settings.api.orders.toDelivered;
    const response = await doRequest<Order>({
      path: api.path + `/${id}`,
      method: api.method,
      jwt: myContext.userContext.jwt,
    });
    if (response) {
      const newOrder = orders.find((o) => o.id === id);
      if (newOrder) {
        newOrder.status = "DELIVERED";
        setOrders([...orders]);
      }
    }
  };

  const toPaid = async (id: string) => {
    const api = settings.api.orders.toPaid;
    const response = await doRequest<Order>({
      path: api.path + `/${id}`,
      method: api.method,
      jwt: myContext.userContext.jwt,
    });
    if (response) {
      const newOrder = orders.find((o) => o.id === id);
      if (newOrder) {
        newOrder.paid = true;
        setOrders([...orders]);
      }
    }
  };

  const cancel = async (id: string) => {
    const api = settings.api.orders.cancel;
    const response = await doRequest<Order>({
      path: api.path + `/${id}`,
      method: api.method,
      jwt: myContext.userContext.jwt,
    });
    if (response) {
      const newOrder = orders.find((o) => o.id === id);
      if (newOrder) {
        newOrder.status = "CANCELLED";
        setOrders([...orders]);
      }
    }
  };
  return (
    <>
      {orders.length === 0 ? (
        <p>No hay registros</p>
      ) : (
        <table className="table" style={{ textAlign: "center" }}>
          <thead>
            <tr className="table-dark">
              <th scope="col">Nombre y apellido</th>
              <th scope="col">Fecha y hora</th>
              <th scope="col">Forma de entrega</th>
              <th scope="col">Forma de pago</th>
              <th scope="col">Pagado</th>
              <th scope="col">Estado</th>
              <th scope="col">Detalles</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord, index) => (
              <tr key={index}>
                <td scope="row">{ord.user?.name + " " + ord.user?.lastName}</td>
                <td>
                  {ord.dateTime.split("T")[0] +
                    " " +
                    ord.dateTime.split("T")[1].substring(0, 8)}
                </td>
                <td>
                  {ord.deliveryMethod === "LOCAL_PICKUP"
                    ? "Retiro en el local"
                    : "Envio a domicilio"}
                </td>
                <td>
                  {ord.paymentMethod === "CASH" ? "Efectivo" : "Mercado Pago"}
                </td>
                <td>{ord.paid ? "Si" : "No"}</td>
                <td>{translateStatus(ord.status)}</td>
                <td>
                  <Link to={`/pedidos/${ord.id}`}>
                    <Button variant="primary" className="btn-sm">
                      Ver Detalle
                    </Button>
                  </Link>
                </td>
                <td>
                  {ord.status === "PENDING" && ord.cookingTime > 0 && (
                    <Button
                      variant="warning"
                      className="btn-sm"
                      onClick={() => toCooking(ord.id)}
                    >
                      <SoupKitchenIcon></SoupKitchenIcon>
                      Cocina
                    </Button>
                  )}
                  {ord.status === "PENDING" && ord.cookingTime === 0 && (
                    <Button
                      variant="success"
                      className="btn-sm"
                      style={{ marginLeft: "10px" }}
                      onClick={() => toReady(ord.id)}
                    >
                      <DoneAllIcon></DoneAllIcon>
                      Listo
                    </Button>
                  )}
                  {!ord.paid && (
                    <Button
                      variant="primary"
                      className="btn-sm"
                      style={{
                        marginLeft: "10px",
                        borderColor: "#003366",
                        backgroundColor: "#003366",
                        color: "white",
                      }}
                      onClick={() => toPaid(ord.id)}
                    >
                      <AttachMoneyIcon></AttachMoneyIcon>
                      Cobrar
                    </Button>
                  )}
                  {ord.status === "READY" &&
                    ord.deliveryMethod === "LOCAL_PICKUP" && (
                      <Button
                        variant="info"
                        className="btn-sm"
                        style={{
                          marginLeft: "10px",
                          backgroundColor: "#8B008B",
                          borderColor: "#8B008B",
                          color: "white",
                        }}
                        onClick={() => toDelivered(ord.id)}
                      >
                        <FastfoodIcon></FastfoodIcon>
                        Entregar
                      </Button>
                    )}

                  {ord.status === "READY" &&
                    ord.deliveryMethod === "HOME_DELIVERY" && (
                      <Button
                        variant="info"
                        className="btn-sm"
                        style={{
                          marginLeft: "10px",
                          backgroundColor: "#2ecc71",
                          borderColor: "#2ecc71",
                          color: "white",
                        }}
                        onClick={() => toDelivery(ord.id)}
                      >
                        <DeliveryDiningIcon></DeliveryDiningIcon>
                        Delivery
                      </Button>
                    )}

                  <Button
                    variant="danger"
                    className="btn-sm"
                    style={{
                      marginLeft: "10px",
                    }}
                    onClick={() => cancel(ord.id)}
                  >
                    <HighlightOffIcon></HighlightOffIcon>
                    Anular
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}