import React, { useState, useEffect } from "react";
import "./BookingCard.scss";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../Firebase";
import confirmed from "../../Assets/images/confirmed.png";
import expired from "../../Assets/images/expired.png";
import cancelled from "../../Assets/images/cancelled.png";

const BookingCard = ({ eventDetails }) => {
  const { selectedDate, expirationDate, location, emailSent, isCancelled } =
    eventDetails;
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const [showModal, setShowModal] = useState(false);
  const [cancelledBooking, setCancelledBooking] = useState(isCancelled);

  useEffect(() => {
    if (!eventDetails.isPaid) {
      const intervalId = setInterval(() => {
        setRemainingTime(getRemainingTime());
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, []);

  function getRemainingTime() {
    const now = new Date();
    const diff = expirationDate.toDate().getTime() - now.getTime();
    return Math.max(0, diff);
  }

  function formatTime(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  const navigate = useNavigate();
  const handleViewDetails = () => {
    if (eventDetails.isPaid) {
      navigate(`/confirmedBooking/${eventDetails.id}`);
    } else {
      navigate(`/payment/${eventDetails.id}`);
    }
  };

  const handleCancel = () => {
    if (emailSent) {
    } else {
      setShowModal(true);
    }
  };

  const handleConfirmCancel = async () => {
    try {
      const bookingRef = firestore.collection("bookings").doc(eventDetails.id);
      await bookingRef.update({ isCancelled: true });
      setCancelledBooking(true)
      console.log("Booking cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="booking-card">
      <div className="booking-details">
        <p>
          <strong>Date:</strong> {selectedDate.toDate().toLocaleDateString()}
        </p>
        <p>
          <strong>Location:</strong> {location}
        </p>
      </div>

      <div className="status">
        {!cancelledBooking ? (
          !eventDetails.isPaid ? (
            getRemainingTime() === 0 ? (
              <img className="statusImage" src={expired} alt="" />
            ) : (
              <p className="timer">{formatTime(remainingTime)}</p>
            )
          ) : (
            <img className="statusImage" src={confirmed} alt="" />
          )
        ) : (
          <img className="statusImage" src={cancelled} alt="" />
        )}
      </div>
      <div className="booking-actions">
        {emailSent ? (
          <button className="emailSentBtn">Check your email</button>
        ) :!cancelledBooking ? (
          <>
            {remainingTime > 0 && (
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </>
        ) : null}
        <button className="view-btn" onClick={handleViewDetails}>
          View Details
        </button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Cancellation</h2>
            <p>Are you sure you want to cancel this booking?</p>
            <div className="modal-buttons">
              <button onClick={handleConfirmCancel}>Yes, Cancel</button>
              <button onClick={handleCloseModal}>No, Keep Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCard;
