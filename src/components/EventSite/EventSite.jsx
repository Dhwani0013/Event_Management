import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EventSite.scss";
import { firestore } from "../../Firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../authentication";
import Loading from "../Loading/Loading";

const EventSite = () => {
  const { id } = useParams();
  const [eventSiteData, setEventSiteData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const { getUserId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [ownerName, setOwnerName] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventSiteData = async () => {
      try {
        const eventSiteRef = firestore.collection("eventSites").doc(id);
        const doc = await eventSiteRef.get();
        if (doc.exists) {
          const eventData = doc.data();
          setEventSiteData(eventData);

          const ownerRef = firestore.collection("users").doc(eventData.owner);
          const ownerDoc = await ownerRef.get();
          if (ownerDoc.exists) {
            const ownerData = ownerDoc.data();
            setOwnerName(ownerData.name); 
          } else {
            console.log("No such owner document!");
          }
          setLoading(false);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching event site data:", error);
      }
    };
  
    fetchEventSiteData();
  }, [id]);
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBooking = async () => {
    try {
      if (!selectedDate) {
        console.error("Please select a date.");
        return;
      }

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);

      const bookingData = {
        eventId: id,
        location: eventSiteData.location,
        selectedDate: selectedDate,
        timestamp: new Date(),
        isPaid: false,
        expirationDate: expirationDate,
        userId: getUserId(),
        emailSent: false,
        isCancelled: false,
      };

      const bookingRef = await firestore
        .collection("bookings")
        .add(bookingData);

      const bookingId = bookingRef.id;

      navigate(`/payment/${bookingId}`);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="event-site">
      <div className="event-site-header">
        <img
          src={eventSiteData.img}
          alt={`Venue Site ${id}`}
          className="event-site-image"
        />
      </div>
      <div className="event-site-details">
        <h1>{eventSiteData.location}</h1>
        <p>
          <strong>Description:</strong> {eventSiteData.description}
        </p>
        <p>
          <strong>Owner:</strong> {ownerName}
        </p>
        <p>
          <strong>Price:</strong> ${eventSiteData.price}
        </p>
      </div>
      <div className="date-picker">
        <h2>Select Date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
        />
      </div>
      <div className="booking-options">
        <h2>Book Now</h2>
        <p>
          You can book this Venue by selecting an available date and
          contacting the owner or through our booking system.
        </p>
        <button
          className="book-now-btn"
          disabled={!selectedDate}
          onClick={handleBooking}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default EventSite;
