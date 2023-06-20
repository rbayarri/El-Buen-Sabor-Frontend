import { Order } from "../../models/order.js";
import { Button } from "react-bootstrap";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Link, Navigate } from "react-router-dom";
import { settings } from "../../lib/settings.js";
import { doRequest } from "../../lib/fetch.js";
import { useContext, useState } from "react";
import { globalContext } from "../../routes/AppRoutes.js";
import swal from "sweetalert";

export default function DeliveryOrdersTable(props: { orders: Order[] }) {
  const myContext = useContext(globalContext);
  const [orders, setOrders] = useState(props.orders);

  const toDelivered = async (id: string) => {
    const api = settings.api.orders.toDelivered;
    const response = await doRequest<Order>({
      path: api.path + `/${id}`,
      method: api.method,
      jwt: myContext.userContext.jwt,
    });
    if (response) {
      swal("Orden entregada", "", "success");
      const updatedOrders = orders.filter((o) => o.id !== id);
      setOrders(updatedOrders);
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
              <th scope="col">Pedido</th>
              <th scope="col">Fecha y hora</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Direccion</th>
              <th scope="col">Codigo Postal</th>
              <th scope="col">Telefono</th>
              <th scope="col">Detalle</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord, index) => (
              <tr key={index}>
                <td scope="row">{ord.id.split("-")[0].toUpperCase()}</td>
                <td>
                  {ord.dateTime.split("T")[0] +
                    " " +
                    ord.dateTime.split("T")[1].substring(0, 8)}
                </td>
                <td>{ord.user?.name}</td>
                <td>{ord.user?.lastName}</td>
                <td>{ord.address.street + " " + ord.address.number}</td>
                <td>{ord.address.zipCode}</td>
                <td>
                  {ord.phoneNumber.areaCode + ord.phoneNumber.phoneNumber}
                </td>
                <td>
                  <Link to={`/pedidos/${ord.id}`}>
                    <Button variant="primary" className="btn-sm">
                      Ver Detalle
                    </Button>
                  </Link>
                </td>
                <td>
                  {ord.status === "ON_THE_WAY" &&
                    ord.deliveryMethod === "HOME_DELIVERY" && (
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
