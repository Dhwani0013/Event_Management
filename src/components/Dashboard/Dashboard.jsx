import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import EventSiteCard from "../EventSiteCards/EventSiteCards";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authentication";
import Loading from "../Loading/Loading";
import LandingPage from "../LandingPage/LandingPage";

const Dashboard = () => {




  return (
    <LandingPage/>
    
  );
};

export default Dashboard;
