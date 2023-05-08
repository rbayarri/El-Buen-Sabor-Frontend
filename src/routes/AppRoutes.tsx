import { Route, Routes } from "react-router-dom";
import FormLogin from "../components/FormLogin";
import FormSignup from "../components/FormSignup";
import { Navigation } from "../components/Navigation";
import App from "../App";
import { Container } from "react-bootstrap";
import CardDetalle from "../components/Card/CardDetalle";

export const AppRoutes = () => {
  return (
    <>
      <Navigation />
      
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/signup" element={<FormSignup />} />
          <Route path="/detalle"/>
          <Route path=":id"  element={<CardDetalle/>}/>
        </Routes>
       
   
     
      {/** Footer */}
    </>
  )
}

{/* <Route path="/detalle">
<Route path=":id"  element={<CardDetalle/>}/>
</Route>  */}

// https://cssgradient.io/