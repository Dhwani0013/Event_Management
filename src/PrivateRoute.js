import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authentication";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const PrivateRoute = () => {
  const storedAuth = localStorage.getItem("isAuthenticated");
  if (storedAuth === "true") {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
