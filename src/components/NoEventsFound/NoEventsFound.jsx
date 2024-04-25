import React, { useEffect, useState } from "react";
import "./NoEventsFound.scss";
import EventSiteCard from "../EventSiteCards/EventSiteCards";
import { useNavigate, useSearchParams, } from "react-router-dom";
import { useAuth } from "../../authentication";
import Loading from "../Loading/Loading";
import { Box, Typography } from "@mui/material";
import BtnSeeAll from "../LandingPage/components/BtnSeeAll/BtnSeeAll";

const NoEventsFound = () => {
  

  return (
    <Box className='noEventFoundWrapper'>
      <img width="500px" height="500px" src="https://elements-cover-images-0.imgix.net/321756e9-14f7-4909-91b3-9b3bbebc2ada?auto=compress%2Cformat&w=1370&fit=max&s=74c38e8ef94410540eac892866fc0622"/>
      <Typography variant="h2"> Oh Snap!</Typography>
      <Typography pb="2rem" variant="h6">no venue near you try to search with different location</Typography>
      <BtnSeeAll  label="Back to Home Page"/>
    </Box>
  );
};

export default NoEventsFound;
