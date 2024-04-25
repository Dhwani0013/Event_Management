import { useNavigate } from "react-router-dom";
import BtnSeeAll from "../BtnSeeAll/BtnSeeAll";
import "./CreationSection.scss";


function CreationSection() {
  const navigate = useNavigate();

  const handleOnClick = ()=>{
    navigate(`/events`);
  }
  return (
    <div>
      <div className="CreationSection">
        <div className="h2">OUR EVENTS</div>
        <BtnSeeAll onClick={handleOnClick}/>
        {/* <div className="btn">SEE ALL</div> */}
      </div>
    </div>
  );
}

export default CreationSection;
