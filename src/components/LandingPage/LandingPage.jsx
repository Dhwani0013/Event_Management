import { Box, Typography } from "@mui/material";
import BtnSeeAll from "./components/BtnSeeAll/BtnSeeAll";
import CreationSection from "./components/CreationSection/CreationSection";
import GallarySection from "./components/GallarySection/GallarySection";
import IntractiveSection from "./components/IntractiveSection/IntractiveSection";
import "./LandingPage.scss";

import Media from "react-media";


const LandingPage=()=> {
  return (
    <div>
      <div className="landingPage">
        <Box pb="3rem" className="landingPage-title-img">
          <Typography className="landingPage-title-text">Let’s create a  memorable experiences</Typography>
          {/* <img width='100%' src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/> */}
        </Box>
         <CreationSection />
        <GallarySection />
        <IntractiveSection />
      </div>
    </div>
  );
}

export default LandingPage;
