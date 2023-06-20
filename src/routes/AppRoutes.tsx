import { Route, Routes } from "react-router-dom";
import { Navigation } from "../components/Navbar/Navigation";
import Home from "../pages/home/Home.tsx";
import { Container } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { SignUpPage } from "../pages/auth/SignUpPage.tsx";
import {
  getOrderFromCookie,
  getUserFromCookie,
  replaceOrderCookie,
} from "../lib/cookies.ts";
import { ContextUser } from "../models/context/context-user.ts";
import { NewEditCategoryPage } from "../pages/categories/NewEditCategoryPage.tsx";
import Categories from "../pages/categories/Categories.tsx";
import IngredientsPage from "../pages/ingredients/IngredientsPage.tsx";
import NewEditIngredientPage from "../pages/ingredients/NewEditIngredientPage.tsx";
import BuyIngredientPage from "../pages/ingredients/BuyIngredientPage.tsx";
import ProductsPage from "../pages/products/ProductsPage.tsx";
import NewEditProductPage from "../pages/products/NewEditProductPage.tsx";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage.tsx";
import ForgetPasswordPage from "../pages/auth/ForgetPasswordPage.tsx";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.tsx";
import MyOrderPage from "../pages/cart/MyOrderPage.tsx";
import { Context } from "../models/context/Context.ts";
import OrderOptionsPage from "../pages/cart/OrderOptionsPage.tsx";
import OrderConfirmationPage from "../pages/cart/OrderConfirmationPage.tsx";
import UserOrderPage from "../pages/user/UserOrderPage.tsx";
import UserOrdersPage from "../pages/user/UserOrdersPage.tsx";
import ProductDescription from "../pages/home/ProductDescription.tsx";
import Orders from "../pages/chef/Orders.tsx";
import DetallePedido from "../pages/chef/DetallePedido.tsx";
import { ContextOrder } from "../models/context/context-order.ts";
import Footer from "../components/Footer/Footer.tsx";
import { LogInPage } from "../pages/auth/LogInPage.tsx";
import UsersPage from "../pages/user/UsersPage.tsx";
import NewEditUserByAdminPage from "../pages/user/NewEditUserByAdminPage.tsx";
import AccountPage from "../pages/user/AccountPage.tsx";
import NewEditAddressPage from "../pages/user/NewEditAddressPage.tsx";
import NewEditPhoneNumberPage from "../pages/user/NewEditPhoneNumberPage.tsx";
import AddressesPage from "../pages/user/AddressesPage.tsx";
import PhoneNumbersPage from "../pages/user/PhoneNumbersPage.tsx";
import EditAccountPage from "../pages/user/EditAccountPage.tsx";
import ProductRanking from "../pages/reports/ProductRanking.tsx";
import ClientRanking from "../pages/reports/ClientRanking.tsx";
import ClientRankingOrders from "../pages/reports/ClientRankingOrders.tsx";
import Profit from "../pages/reports/Profit.tsx";
import CashierPage from "../pages/Cashier/CashierOrdersPage.tsx";
import DeliveryOrdersPage from "../pages/delivery/DeliveryOrdersPage.tsx";

export const emptyUser: ContextUser = {
  name: "",
  lastName: "",
  role: "USER",
  authenticated: false,
  firstTimeAccess: false,
};

const emptyOrder: ContextOrder = {
  orderDetails: [
    {
      product: {
        id: "034e1321-9b56-4de7-af73-610b0cfc521b",
        name: "algo",
        description: "algo",
        price: 0,
        image: {
          id: "0390a44d-4d45-40cf-a828-a88790f5d304",
          location:
            "https://www.webempresa.com/foro/wp-content/uploads/wpforo/attachments/3200/318277=80538-Sin_imagen_disponible.jpg",
        },
        stock: 0,
      },
      quantity: 2,
    },
    {
      product: {
        id: "19721a98-ac14-4239-a3a3-644910d855f9",
        name: "algo",
        description: "algo",
        price: 0,
        image: {
          id: "0390a44d-4d45-40cf-a828-a88790f5d304",
          location:
            "https://www.webempresa.com/foro/wp-content/uploads/wpforo/attachments/3200/318277=80538-Sin_imagen_disponible.jpg",
        },
        stock: 0,
      },
      quantity: 1,
    },
    {
      product: {
        id: "9c500c90-7cc4-4d67-962b-dfe5ad8c564e",
        name: "algo",
        description: "algo",
        price: 0,
        image: {
          id: "0390a44d-4d45-40cf-a828-a88790f5d304",
          location:
            "https://www.webempresa.com/foro/wp-content/uploads/wpforo/attachments/3200/318277=80538-Sin_imagen_disponible.jpg",
        },
        stock: 0,
      },
      quantity: 16,
    },
  ],
};

const initialUser = () => {
  const userFromCookie = getUserFromCookie();
  if (userFromCookie) {
    return userFromCookie;
  }
  return emptyUser;
};

const initialOrder = () => {
  const orderFromCookie = getOrderFromCookie();
  if (orderFromCookie) {
    return orderFromCookie;
  }
  return emptyOrder;
};

const initialContext: Context = {
  userContext: initialUser(),
  order: initialOrder(),
};

export const globalContext = React.createContext<Context>(initialContext);
export const AppRoutes = () => {
  const myContext = useContext(globalContext);
  const [user, setUser] = useState<ContextUser>(myContext.userContext);
  const [order, setOrder] = useState<ContextOrder>(myContext.order);

  const handleUserChanges = (newUser: ContextUser) => {
    setUser(newUser);
  };

  const handleOrderChanges = (newOrder: ContextOrder) => {
    replaceOrderCookie(newOrder);
    setOrder(newOrder);
  };

  useEffect(() => {
    myContext.userContext.onChange = handleUserChanges;
    myContext.userContext.onChange(user);
    myContext.order.onChange = handleOrderChanges;
    myContext.order.onChange(order);
  }, []);

  return (
    <>
      <globalContext.Provider value={{ userContext: user, order: order }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Container className="mt-5 pt-5 mb-5 pb-5">
          <Routes>
            <Route path="/detalle/:id/" element={<ProductDescription />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/verifyEmail/:userId/:tokenId"
              element={<VerifyEmailPage />}
            />
            <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
            <Route
              path="/resetPassword/:userId/:tokenId"
              element={<ResetPasswordPage />}
            />
            <Route
              path="/rubros/ingredientes"
              element={<Categories target={"ingredientes"} />}
            />
            <Route
              path="/rubros/productos"
              element={<Categories target={"productos"} />}
            />
            <Route
              path="/rubros/ingredientes/:id"
              element={<NewEditCategoryPage target={"ingredientes"} />}
            />
            <Route
              path="/rubros/productos/:id"
              element={<NewEditCategoryPage target={"productos"} />}
            />
            <Route path="/productos" element={<ProductsPage />} />
            <Route path="/ingredientes" element={<IngredientsPage />} />
            <Route
              path="/ingredientes/:id"
              element={<NewEditIngredientPage />}
            />
            <Route path="/productos/:id" element={<NewEditProductPage />} />
            <Route
              path="/ingredientes/compra/:id"
              element={<BuyIngredientPage />}
            />
            <Route path="/pedido" element={<MyOrderPage />} />
            <Route path="/pedido/opciones" element={<OrderOptionsPage />} />
            <Route
              path="/pedido/confirmacion"
              element={<OrderConfirmationPage />}
            />
            <Route path="/cuenta" element={<AccountPage />} />
            <Route path="/cuenta/editar" element={<EditAccountPage />} />
            <Route path="/pedidos" element={<UserOrdersPage />} />
            <Route path="/pedidos/:id" element={<UserOrderPage />} />
            <Route path="/direcciones" element={<AddressesPage />} />
            <Route path="/direcciones/:id" element={<NewEditAddressPage />} />
            <Route path="/telefonos" element={<PhoneNumbersPage />} />
            <Route path="/telefonos/:id" element={<NewEditPhoneNumberPage />} />
            <Route path="/cocina/pedidos/" element={<Orders />} />
            <Route path="/detallepedido/" element={<DetallePedido />} />
            <Route path="/usuarios" element={<UsersPage />} />
            <Route path="/usuarios/:id" element={<NewEditUserByAdminPage />} />
            <Route path="/rankingProductos" element={<ProductRanking />} />
            <Route path="/rankingClientes" element={<ClientRanking />} />
            <Route
              path="/rankingClientes/:id"
              element={<ClientRankingOrders />}
            />
            <Route path="/ganancias" element={<Profit />} />
            <Route path="/cajero/pedidos" element={<CashierPage />} />
            <Route path="/delivery/pedidos" element={<DeliveryOrdersPage />} />
          </Routes>
        </Container>
        <Footer />
      </globalContext.Provider>
    </>
  );
};
