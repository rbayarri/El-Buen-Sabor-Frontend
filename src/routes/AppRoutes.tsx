import { Component, ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import FormLogin from "./FormLogin";
import FormSignup from "./FormSignup";
import { Navigation } from "./Navigation";
import App from "../App";
import { Container } from "react-bootstrap";

/*
export class AppRoutes extends Component {

  render(): ReactNode {
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
        {/** Footer */ /*}
      </>
    )
  }
}
  */

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