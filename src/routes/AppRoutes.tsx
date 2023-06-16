import {Route, Routes} from "react-router-dom";
import {Navigation} from "../components/Navbar/Navigation";
import App from "../App";
import {Container} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {LogInPage} from "../pages/auth/LogInPage.tsx";
import {SignUpPage} from "../pages/auth/SignUpPage.tsx";
import {getUserFromCookie} from "../lib/cookies.ts";
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
import CardDetalle from "../components/Card/CardDetalle.tsx";
import Footer from "../components/Footer/Footer.tsx";
import Orders from "../pages/Chef/Orders.tsx";
import DetallePedido from "../pages/Chef/DetallePedido.tsx";


export const emptyUser: ContextUser = {
    name: "",
    lastName: "",
    role: "USER",
    authenticated: false
}

const initialUser = () => {
    const userFromCookie = getUserFromCookie();
    if (userFromCookie) {
        return userFromCookie;
    }
    return emptyUser;
}
export const globalContext = React.createContext<ContextUser>(initialUser());
export const AppRoutes = () => {

    const myContext = useContext(globalContext);
    const [user, setUser] = useState<ContextUser>(myContext);

    const handleUserChanges = (newUser: ContextUser) => {
        setUser(newUser)
    }

    useEffect((() => {
        myContext.onChange = handleUserChanges;
        myContext.onChange(user);
    }), []);

    return (
        <>
            <globalContext.Provider value={user}>
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
                        <Route path="/rubros/ingredientes/:id" element={<NewEditCategoryPage target={"ingredientes"}/>}/>
                        <Route path="/rubros/productos/:id" element={<NewEditCategoryPage target={"productos"}/>}/>
                        <Route path="/productos" element={<ProductsPage/>}/>
                        <Route path="/ingredientes" element={<IngredientsPage/>}/>
                        <Route path="/ingredientes/:id" element={<NewEditIngredientPage/>}/>
                        <Route path="/productos/:id" element={<NewEditProductPage/>}/>
                        <Route path="/ingredientes/compra/:id" element={<BuyIngredientPage/>}/>
                        {/*<Route path="/deliveryList" element={<DeliveryList />} />*/}
                        <Route path="/detalle/:id/"  element={<CardDetalle/>}/>
                        <Route path="/cocina/pedidos/" element= {<Orders/>}/>
                        <Route path="/detallepedido/" element= {<DetallePedido/>}/>
                     </Routes>                  
                </Container>
                <Footer />
            </globalContext.Provider>
        </>
    )
}