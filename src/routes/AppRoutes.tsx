import { Route, Routes } from "react-router-dom";
import FormSignup from "../components/Auth/FormSignup";
import { Navigation } from "../components/Navbar/Navigation";
import App from "../App";
import { Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { LoginPage } from "../pages/auth/LoginPage";

export type Role = "USER" | "ADMIN" | "CASHIER" | "CHEF" | "DELIVERY"

type User = {
  name: string
  lastName: string
  picture: string
  role: Role
  authenticated: boolean
  onChange?: (newUser: User) => void
}

const emptyUser: User = {
  name: "",
  lastName: "",
  picture: "",
  role: "USER",
  authenticated: false
}

export const myContext = React.createContext<User>(emptyUser);

export const AppRoutes = () => {

  const [user, setUser] = useState<User>(emptyUser);

  const handleUserChanges = (newUser: User) => {
    setUser(newUser)
  }

  useEffect(()=>{
    emptyUser.onChange = handleUserChanges
  })

  return (
    <>
      <myContext.Provider value={user}>
        <Navigation />
        <Container className="mt-5 pt-5">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<FormSignup />} />
          </Routes>
        </Container>
        {/** Footer */}
      </myContext.Provider>
    </>
  )
}