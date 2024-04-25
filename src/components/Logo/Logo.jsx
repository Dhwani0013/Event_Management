// import "logo.scss";
import "./Logo.scss";

import { Link } from "react-router-dom";

function Logo() {
  return (
    <div>
      <div className="logo">
        <Link to="/">
          <img src={'https://e7.pngegg.com/pngimages/112/969/png-clipart-logo-brand-event-graphy-monogram-others-miscellaneous-white.png'} alt="logo" />
        </Link>
      </div>
    </div>
  );
}

export default Logo;
