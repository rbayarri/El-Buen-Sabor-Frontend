import {Route, Routes} from "react-router-dom";
import {Navigation} from "../components/Navbar/Navigation";
import Home from "../pages/home/Home.tsx";
import React, {useContext, useEffect, useState} from "react";
import {SignUpPage} from "../pages/auth/SignUpPage.tsx";
import {getOrderFromCookie, getUserFromCookie, replaceOrderCookie,} from "../lib/cookies.ts";
import {ContextUser} from "../models/context/context-user.ts";
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
import {Context} from "../models/context/Context.ts";
import OrderOptionsPage from "../pages/cart/OrderOptionsPage.tsx";
import OrderConfirmationPage from "../pages/cart/OrderConfirmationPage.tsx";
import UserOrderPage from "../pages/user/UserOrderPage.tsx";
import UserOrdersPage from "../pages/user/UserOrdersPage.tsx";
import ProductDescription from "../pages/home/ProductDescription.tsx";
import {ContextOrder} from "../models/context/context-order.ts";
import Orders from "../pages/chef/ChefOrders.tsx";
import Footer from "../components/Footer/Footer.tsx";
import {LogInPage} from "../pages/auth/LogInPage.tsx";
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
import ChefRecipe from "../pages/chef/ChefRecipe.tsx";
import ErrorPage from "../pages/404/ErrorPage.tsx";
import {ClientProduct} from "../models/products/client-product.ts";
import FilterRoute from "./FilterRoute.tsx";
import ChangePasswordPage from "../pages/auth/ChangePasswordPage.tsx";

export const emptyUser: ContextUser = {
    name: "",
    lastName: "",
    role: "USER",
    authenticated: false,
    firstTimeAccess: false,
    image: "",
    username: ""
};

const emptyOrder: ContextOrder = {
    orderDetails: []
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
    const [products, setProducts] = useState<ClientProduct[]>();

    const handleUserChanges = (newUser: ContextUser) => {
        setUser(newUser);
    };

    const handleOrderChanges = (newOrder: ContextOrder) => {
        replaceOrderCookie(newOrder);
        setOrder(newOrder);
    };

    const handleProductsChange = (products: ClientProduct[] | undefined) => {
        setProducts(products);
    }

    useEffect(() => {
        myContext.userContext.onChange = handleUserChanges;
        myContext.userContext.onChange(user);
        myContext.order.onChange = handleOrderChanges;
        myContext.order.onChange(order);
    }, [myContext]);

    return (
        <>
            <globalContext.Provider value={{userContext: user, order: order}}>
                <Navigation productsChange={handleProductsChange}/>
                <Routes>
                    <Route path="/"
                           element={<FilterRoute withContainer={false} component={<Home products={products}/>}/>}/>
                    <Route path="/detalle/:id/"
                           element={<FilterRoute withContainer={true} component={<ProductDescription/>}/>}/>
                    <Route path="/login" element={<FilterRoute withContainer={true} component={<LogInPage/>}/>}/>
                    <Route path="/signup" element={<FilterRoute withContainer={true} component={<SignUpPage/>}/>}/>
                    <Route path="/firstTimeAccess" element={<ChangePasswordPage/>}/>
                    <Route path="/verifyEmail/:userId/:tokenId"
                           element={<FilterRoute withContainer={true} component={<VerifyEmailPage/>}/>}/>
                    <Route path="/forgetPassword"
                           element={<FilterRoute withContainer={true} component={<ForgetPasswordPage/>}/>}/>
                    <Route path="/resetPassword/:userId/:tokenId"
                           element={<FilterRoute withContainer={true} component={<ResetPasswordPage/>}/>}/>
                    <Route path="/rubros/ingredientes"
                           element={<FilterRoute withContainer={true}
                                                 component={<Categories target={"ingredientes"}/>}/>}/>
                    <Route path="/rubros/productos"
                           element={<FilterRoute withContainer={true}
                                                 component={<Categories target={"productos"}/>}/>}/>
                    <Route path="/rubros/ingredientes/:id"
                           element={<FilterRoute withContainer={true}
                                                 component={<NewEditCategoryPage target={"ingredientes"}/>}/>}/>
                    <Route path="/rubros/productos/:id"
                           element={<FilterRoute withContainer={true}
                                                 component={<NewEditCategoryPage target={"productos"}/>}/>}/>
                    <Route path="/productos" element={<FilterRoute withContainer={true} component={<ProductsPage/>}/>}/>
                    <Route path="/ingredientes"
                           element={<FilterRoute withContainer={true} component={<IngredientsPage/>}/>}/>
                    <Route path="/ingredientes/:id"
                           element={<FilterRoute withContainer={true} component={<NewEditIngredientPage/>}/>}/>
                    <Route path="/productos/:id"
                           element={<FilterRoute withContainer={true} component={<NewEditProductPage/>}/>}/>
                    <Route path="/ingredientes/compra/:id"
                           element={<FilterRoute withContainer={true} component={<BuyIngredientPage/>}/>}/>
                    <Route path="/pedido" element={<FilterRoute withContainer={true} component={<MyOrderPage/>}/>}/>
                    <Route path="/pedido/opciones"
                           element={<FilterRoute withContainer={true} component={<OrderOptionsPage/>}/>}/>
                    <Route path="/pedido/confirmacion"
                           element={<FilterRoute withContainer={true} component={<OrderConfirmationPage/>}/>}/>
                    <Route path="/cuenta" element={<FilterRoute withContainer={true} component={<AccountPage/>}/>}/>
                    <Route path="/cuenta/editar"
                           element={<FilterRoute withContainer={true} component={<EditAccountPage/>}/>}/>
                    <Route path="/pedidos" element={<FilterRoute withContainer={true} component={<UserOrdersPage/>}/>}/>
                    <Route path="/pedidos/:id"
                           element={<FilterRoute withContainer={true} component={<UserOrderPage/>}/>}/>
                    <Route path="/direcciones"
                           element={<FilterRoute withContainer={true} component={<AddressesPage/>}/>}/>
                    <Route path="/direcciones/:id"
                           element={<FilterRoute withContainer={true} component={<NewEditAddressPage/>}/>}/>
                    <Route path="/telefonos"
                           element={<FilterRoute withContainer={true} component={<PhoneNumbersPage/>}/>}/>
                    <Route path="/telefonos/:id"
                           element={<FilterRoute withContainer={true} component={<NewEditPhoneNumberPage/>}/>}/>
                    <Route path="/cocina/pedidos/" element={<FilterRoute withContainer={true} component={<Orders/>}/>}/>
                    <Route path="/cocina/producto/:id"
                           element={<FilterRoute withContainer={true} component={<ChefRecipe/>}/>}/>
                    <Route path="/usuarios" element={<FilterRoute withContainer={true} component={<UsersPage/>}/>}/>
                    <Route path="/usuarios/:id"
                           element={<FilterRoute withContainer={true} component={<NewEditUserByAdminPage/>}/>}/>
                    <Route path="/rankingProductos"
                           element={<FilterRoute withContainer={true} component={<ProductRanking/>}/>}/>
                    <Route path="/rankingClientes"
                           element={<FilterRoute withContainer={true} component={<ClientRanking/>}/>}/>
                    <Route path="/rankingClientes/:id"
                           element={<FilterRoute withContainer={true} component={<ClientRankingOrders/>}/>}/>
                    <Route path="/ganancias" element={<FilterRoute withContainer={true} component={<Profit/>}/>}/>
                    <Route path="/cajero/pedidos"
                           element={<FilterRoute withContainer={true} component={<CashierPage/>}/>}/>
                    <Route path="/delivery/pedidos"
                           element={<FilterRoute withContainer={true} component={<DeliveryOrdersPage/>}/>}/>
                    <Route path="/error/:message"
                           element={<FilterRoute withContainer={true} component={<ErrorPage/>}/>}/>
                    <Route path="*" element={<FilterRoute withContainer={true} component={<ErrorPage/>}/>}/>
                </Routes>
                <Footer/>
            </globalContext.Provider>
        </>
    )
}
