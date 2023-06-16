import {Route, Routes} from "react-router-dom";
import {Navigation} from "../components/Navbar/Navigation";
import App from "../App";
import {Container} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {LogInPage} from "../pages/auth/LogInPage.tsx";
import {SignUpPage} from "../pages/auth/SignUpPage.tsx";
import {getOrderFromCookie, getUserFromCookie, replaceOrderCookie} from "../lib/cookies.ts";
import {ContextUser} from "../models/context-user.ts";
import {NewEditCategoryPage} from "../pages/categories/NewEditCategoryPage.tsx";
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
import MercadoPago from "../pages/MercadoPago.tsx";
import {Context} from "../models/Context.ts";
import {CookieOrder} from "../models/order.ts";
import OrderOptionsPage from "../pages/cart/OrderOptionsPage.tsx";
import OrderConfirmationPage from "../pages/cart/OrderConfirmationPage.tsx";
import SingleOrderPage from "../pages/SingleOrderPage.tsx";
import OrdersPage from "../pages/OrdersPage.tsx";

export const emptyUser: ContextUser = {
    name: "",
    lastName: "",
    role: "USER",
    authenticated: false
}

const emptyOrder: CookieOrder = {
    orderDetails: [
        {
            product: {
                id: "034e1321-9b56-4de7-af73-610b0cfc521b",
                name: "algo",
                description: "algo",
                price: 0,
                image: {
                    id: "0390a44d-4d45-40cf-a828-a88790f5d304",
                    location: "https://www.webempresa.com/foro/wp-content/uploads/wpforo/attachments/3200/318277=80538-Sin_imagen_disponible.jpg"
                },
                stock: 0
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
                    location: "https://www.webempresa.com/foro/wp-content/uploads/wpforo/attachments/3200/318277=80538-Sin_imagen_disponible.jpg"
                },
                stock: 0
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
                    location: "https://www.webempresa.com/foro/wp-content/uploads/wpforo/attachments/3200/318277=80538-Sin_imagen_disponible.jpg"
                },
                stock: 0
            },
            quantity: 16,
        },
    ]
}

const initialUser = () => {
    const userFromCookie = getUserFromCookie();
    if (userFromCookie) {
        return userFromCookie;
    }
    return emptyUser;
}

const initialOrder = () => {
    const orderFromCookie = getOrderFromCookie();
    if (orderFromCookie) {
        return orderFromCookie;
    }
    return emptyOrder;
}

const initialContext: Context = {
    userContext: initialUser(),
    order: initialOrder()
}

export const globalContext = React.createContext<Context>(initialContext);
export const AppRoutes = () => {

    const myContext = useContext(globalContext);
    const [user, setUser] = useState<ContextUser>(myContext.userContext);
    const [order, setOrder] = useState<CookieOrder>(myContext.order);

    const handleUserChanges = (newUser: ContextUser) => {
        setUser(newUser);
    }

    const handleOrderChanges = (newOrder: CookieOrder) => {
        replaceOrderCookie(newOrder);
        setOrder(newOrder);
    }

    useEffect((() => {
        myContext.userContext.onChange = handleUserChanges;
        myContext.userContext.onChange(user);
        myContext.order.onChange = handleOrderChanges;
        myContext.order.onChange(order);
    }), []);

    return (
        <>
            <globalContext.Provider value={{userContext: user, order: order}}>
                <Navigation/>
                <Container className="mt-5 pt-5">
                    <Routes>
                        <Route path="/" element={<App/>}/>
                        <Route path="/login" element={<LogInPage/>}/>
                        <Route path="/signup" element={<SignUpPage/>}/>
                        <Route path="/verifyEmail/:userId/:tokenId" element={<VerifyEmailPage/>}/>
                        <Route path="/forgetPassword" element={<ForgetPasswordPage/>}/>
                        <Route path="/resetPassword/:userId/:tokenId" element={<ResetPasswordPage/>}/>
                        <Route path="/rubros/ingredientes" element={<Categories target={"ingredientes"}/>}/>
                        <Route path="/rubros/productos" element={<Categories target={"productos"}/>}/>
                        <Route path="/rubros/ingredientes/:id"
                               element={<NewEditCategoryPage target={"ingredientes"}/>}/>
                        <Route path="/rubros/productos/:id" element={<NewEditCategoryPage target={"productos"}/>}/>
                        <Route path="/productos" element={<ProductsPage/>}/>
                        <Route path="/ingredientes" element={<IngredientsPage/>}/>
                        <Route path="/ingredientes/:id" element={<NewEditIngredientPage/>}/>
                        <Route path="/productos/:id" element={<NewEditProductPage/>}/>
                        <Route path="/ingredientes/compra/:id" element={<BuyIngredientPage/>}/>
                        <Route path="/pedido" element={<MyOrderPage/>}/>
                        <Route path="/pedido/opciones" element={<OrderOptionsPage/>}/>
                        <Route path="/pedido/confirmacion" element={<OrderConfirmationPage/>}/>
                        <Route path="/user/pedidos" element={<OrdersPage/>}/>
                        <Route path="/user/pedidos/:id" element={<SingleOrderPage/>}/>
                        <Route path="/feedback" element={<MercadoPago/>}/>
                        {/*<Route path="/deliveryList" element={<DeliveryList />} />*/}
                        {/*<Route path="/detalle/:id/"  element={<CardDetalle/>}/>*/}
                    </Routes>
                </Container>
                {/** Footer */}
            </globalContext.Provider>
        </>
    )
}