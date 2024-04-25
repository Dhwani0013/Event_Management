import React, { useState, useEffect } from "react";
import "./PaymentsPage.scss";
import { useParams, useNavigate } from "react-router-dom";
import googlePay from "../../Assets/images/googlePay.png";
import applePay from "../../Assets/images/applePay.png";
import visa from "../../Assets/images/visa.png";
import { firestore } from "../../Firebase";
import Loading from "../Loading/Loading";

const PaymentsPage = () => {
  const { bookingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [eventDetails, setEventDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [expirationTime, setExpirationTime] = useState(null);
  const [eventOwnerName, setEventOwnerName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDataFromFirebase = async () => {
      try {
        const bookingRef = firestore.collection("bookings").doc(bookingId);
        const doc = await bookingRef.get();
        if (doc.exists) {
          const eventData = await fetchEventData(doc.data().eventId);
          setEventDetails(eventData);
          setSelectedDate(doc.data().selectedDate);

          const ownerName = await fetchOwnerName(eventData.owner);
          setEventOwnerName(ownerName);

          const expirationDate = doc.data().expirationDate.toDate();
          const now = new Date();
          const timeDifference = expirationDate.getTime() - now.getTime();
          setExpirationTime(timeDifference > 0 ? timeDifference : 0);
          setLoading(false);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };
    fetchBookingDataFromFirebase();
  }, [bookingId, expirationTime]);

  useEffect(() => {
    let intervalId;

    if (expirationTime > 0) {
      intervalId = setInterval(() => {
        setExpirationTime((prevExpirationTime) => {
          if (prevExpirationTime > 0) {
            return prevExpirationTime - 1000;
          } else {
            clearInterval(intervalId);
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [expirationTime]);

  const fetchEventData = async (eventId) => {
    try {
      const eventRef = firestore.collection("eventSites").doc(eventId);
      const doc = await eventRef.get();
      if (doc.exists) {
        return doc.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const fetchOwnerName = async (ownerId) => {
    try {
      const userRef = firestore.collection("users").doc(ownerId);
      const doc = await userRef.get();
      if (doc.exists) {
        return doc.data().name;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching owner's name:", error);
      return null;
    }
  };

  const handlePayment = async (method) => {

      try {
        const bookingRef = firestore.collection("bookings").doc(bookingId);
        await bookingRef.update({
          isPaid: true,
          paymentMethod: method,
        });
        window.location.href = "https://buy.stripe.com/test_bIY3dh3Sf9eq3E4fYY";
        navigate("/");
      } catch (error) {
        console.error("Error updating booking status:", error);
      }
  };

  const formatExpirationTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}:${minutes}:${seconds}`;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="payments-page">
      <h1>Payment Options</h1>
      {eventDetails && (
        <div className="event-details">
          <p>
            <strong>Venue Location:</strong> {eventDetails.location}
          </p>
          <p>
            <strong>Venue Owner:</strong> {eventOwnerName}
          </p>
          <p>
            <strong>Venue Price:</strong> ${eventDetails.price}
          </p>
        </div>
      )}
      {selectedDate && (
        <p>
          <strong>Selected Date:</strong>{" "}
          {selectedDate.toDate().toLocaleDateString()}
        </p>
      )}
      {expirationTime !== null && (
        <p>
          <strong>Expiration Time:</strong>{" "}
          {formatExpirationTime(expirationTime)}
        </p>
      )}
      {expirationTime > 0 ? (
        <PaymentOptions handlePayment={handlePayment} />
      ) : (
        <p>Oops, you ran out of time.</p>
      )}
    </div>
  );
};

const PaymentOptions = ({ handlePayment }) => {

  return (
    <div className="payment-options">
      <div
        className="payment-option"
        onClick={() => handlePayment("Google Pay")}
      >
        <img src={googlePay} alt="Google Pay" className="payment-icon" />
        <span className="payment-label">Google Pay</span>
      </div>
      <div
        className="payment-option"
        onClick={() => handlePayment("Apple Pay")}
      >
        <img src={applePay} alt="Apple Pay" className="payment-icon" />
        <span className="payment-label">Apple Pay</span>
      </div>
      <div
        className="payment-option"
        onClick={() => handlePayment("Credit Card")}
      >
        <img src={visa} alt="Card Payment" className="payment-icon" />
        <span className="payment-label">Credit/Debit Card</span>
      </div>
    </div>
  );
};

export default PaymentsPage;
