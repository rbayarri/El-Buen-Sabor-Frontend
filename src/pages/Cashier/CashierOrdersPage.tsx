import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Order } from "../../models/order.ts";
import { Button, Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import CashierOrdersTable from "../../components/Cashier/CashierOrdersTable.tsx";
import { doRequest } from "../../lib/fetch.ts";
import { globalContext } from "../../routes/AppRoutes.tsx";
import { settings } from "../../lib/settings.ts";

const CashierPage = () => {
  const myContext = useContext(globalContext);
  const [statusSearch, setStatusSearch] = useState<string>("ALL");
  const [ordenes, setOrdenes] = useState<Order[]>([]);
  const [ordenesFiltradas, setOrdenesFiltradas] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCashierOrders = async () => {
    const api = settings.api.orders.cashier;
    const response = await doRequest<Order[]>({
      path: api.path,
      method: api.method,
      jwt: myContext.userContext.jwt,
    });
    if (response) {
      setOrdenes(response);
      setOrdenesFiltradas(response);
      setIsLoading(false);
    }
  };

  const filtrar: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;

    if (ordenes) {
      const ordenesFiltradas = ordenes.filter((u) =>
        value === "ALL" ? true : u.status === value
      );
      setOrdenesFiltradas(ordenesFiltradas);
      setStatusSearch(value);
    }
  };

  useEffect(() => {
    getCashierOrders();
  }, []);

  if (
    myContext.userContext.authenticated &&
    (myContext.userContext.role === "CASHIER" ||
      myContext.userContext.role === "ADMIN")
  ) {
    return (
      <>
        <h1>Listado de Pedidos</h1>
        <div
          className={"my-4 d-flex justify-content-between align-items-center"}
        >
          <div className="d-flex align-items-center">
            <span>Estado </span>
            <Form className="d-flex ms-3">
              <Form.Select
                className="ms-3"
                value={statusSearch}
                onChange={filtrar}
              >
                <option key={"ALL"} value={"ALL"}>
                  Todos
                </option>
                <option key={"PENDING"} value={"PENDING"}>
                  Pendiente
                </option>
                <option key={"COOKING"} value={"COOKING"}>
                  En cocina
                </option>
                <option key={"READY"} value={"READY"}>
                  Listo
                </option>
                <option key={"ON_THE_WAY"} value={"ON_THE_WAY"}>
                  En camino
                </option>
                <option key={"DELIVERED"} value={"ADMIN"}>
                  Entregado
                </option>
                <option key={"CANCELLED"} value={"CANCELLED"}>
                  Cancelada
                </option>
              </Form.Select>
            </Form>
          </div>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <CashierOrdersTable orders={ordenesFiltradas} />
        )}
      </>
    );
  }
  return <Navigate to={"/"} />;
};

export default CashierPage;
