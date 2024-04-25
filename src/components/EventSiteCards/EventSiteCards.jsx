import React from "react";
import "./EventSiteCards.scss";
import { Edit } from "@mui/icons-material";

const EventSiteCard = ({
  location,
  description,
  img,
  showOnly = false,
  onBookNowClick,
  price,
  openEditModal
}) => {
  return (
    <div className="event-site-card">
      <div className="card-header">
        <h3>{location}</h3>
      <img src={img} alt={location} />
      </div>
      <div className="card-body">
        <p>{description}</p>
        {!showOnly ? (
          <button className="book-now-btn" onClick={onBookNowClick}>
            Book Now
          </button>
        ) : (
          <div className="editable">
            <p>{price}</p>
            <Edit className="edit-btn" onClick={openEditModal}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSiteCard;
