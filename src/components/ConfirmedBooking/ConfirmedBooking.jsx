import React, { useState, useEffect } from "react";
import "./ConfirmedBooking.scss";
import { firestore } from "../../Firebase";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

const ConfirmedBooking = () => {
  const { bookingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);
  const [eventSiteData, setEventSiteData] = useState(null);
  const [ownerEmail, setOwnerEmail] = useState("");

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const bookingRef = firestore.collection("bookings").doc(bookingId);
        const bookingSnapshot = await bookingRef.get();
        if (bookingSnapshot.exists) {
          setBookingData(bookingSnapshot.data());
          const eventId = bookingSnapshot.data().eventId;
          const eventSiteRef = firestore.collection("eventSites").doc(eventId);
          const eventSiteSnapshot = await eventSiteRef.get();
          if (eventSiteSnapshot.exists) {
            setEventSiteData(eventSiteSnapshot.data());
            const ownerId = eventSiteSnapshot.data().owner;
            const ownerRef = firestore.collection("users").doc(ownerId);
            const ownerSnapshot = await ownerRef.get();
            if (ownerSnapshot.exists) {
              setOwnerEmail(ownerSnapshot.data().email);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
      } finally {
        setLoading(false); // Set loading to false after data retrieval is complete
      }
    };

    fetchBookingData();
  }, [bookingId]);

  console.log("LOAING", loading)
  if (loading) {
    return <Loading/>
  } else if (!bookingData?.isPaid || bookingData?.isCancelled) {
    return <p>No Booking data</p>;
  }

  return (
    <div className="confirmed-booking">
      <h2>Booking Details</h2>
      {bookingData && (
        <div className="booking-info">
          <p>
            <span className="label">Booking Reference:</span>{" "}
            <span className="value">{bookingId}</span>
          </p>
          <p>
            <span className="label">Selected Date:</span>{" "}
            <span className="value">
              {bookingData.selectedDate &&
                bookingData.selectedDate.toDate().toLocaleDateString()}
            </span>
          </p>
          <p>
            <span className="label">Payment Method:</span>{" "}
            <span className="value">{bookingData.paymentMethod}</span>
          </p>
        </div>
      )}
      {eventSiteData && (
        <div className="event-info">
          <h3>Venue Site Details</h3>
          <p>
            <span className="label">Location:</span>{" "}
            <span className="value">{eventSiteData.location}</span>
          </p>
          <p>
            <span className="label">Owner:</span>{" "}
            <span className="value">{ownerEmail}</span>
          </p>
          <p>
            <span className="label">Price:</span>{" "}
            <span className="value">${eventSiteData.price}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ConfirmedBooking;
