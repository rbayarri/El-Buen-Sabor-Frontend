import { Route, Routes } from "react-router-dom";
import FormLogin from "../components/FormLogin";
import FormSignup from "../components/FormSignup";
import { Navigation } from "../components/Navigation";
import App from "../App";
import { Container } from "react-bootstrap";

export const AppRoutes = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/signup" element={<FormSignup />} />
        </Routes>
      </Container>
      {/** Footer */}
    </>
  )
}