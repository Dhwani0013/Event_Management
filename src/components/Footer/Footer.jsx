import "./Footer.scss";
import Navbar from "../Navbar/Navbar";

function RightSection() {
  return (
    <div className="Footer-right-section">
      <div className="social-links">
        <div className="facebook img-box">
          <img
            src={"https://www.svgrepo.com/show/449740/facebook.svg"}
            alt="Social media Icons"
            width={"20px"}
            height={"fit-content"}
          />
        </div>
        <div className="twitter img-box">
          <img
            src={"https://www.svgrepo.com/show/475928/twitter-bird.svg"}
            alt="Social media Icons"
            width={"20px"}
            height={"fit-content"}
          />
        </div>
        <div className="pinterest img-box">
          <img
            src={"https://www.svgrepo.com/show/449859/pinterest.svg"}
            alt="Social media Icons"
            width={"20px"}
            height={"fit-content"}
          />
        </div>
        {/* <div className="instagram img-box">
            <img src={instagramLogo} alt="Social media Icons" />
          </div> */}
      </div>
      <div className="copyright">
        &copy; 2024 EventCrafters. All rights reserved.
      </div>
    </div>
  );
}
function Footer() {
  return (
    <div className="Footer">
      {/* left section */}
      {/* <div className="Footer-left-section">
          <div className="navba"> */}
      {/* <Logo />
            <NavLinks /> */}
      {/* <Navbar navCss="links" /> */}
      {/* </div> */}
      {/* <Navbar /> */}
      {/* </div> */}
      <RightSection />
    </div>
  );
}

export default Footer;
