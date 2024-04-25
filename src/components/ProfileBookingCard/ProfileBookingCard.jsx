import React, { useState, useEffect } from "react";
import "./ProfileBookingCard.scss";
import { firestore } from "../../Firebase";
import SendIcon from "@mui/icons-material/Send";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import GppBadIcon from "@mui/icons-material/GppBad";

const ProfileBookingCard = ({ bookingDetails, eventSite }) => {
  const {
    eventId,
    expirationDate,
    isPaid,
    location,
    selectedDate,
    timestamp,
    userId,
  } = bookingDetails;

  const [userData, setUserData] = useState(null);
  const [emailSent, setEmailSent] = useState(bookingDetails.emailSent);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore.collection("users").doc(userId).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleSendEmail = () => {
    const subject = "Regarding your booking";
    const body = `Dear customer,\n\nWe Confirm your booking for the price, to know more you can contact us on the same email.`;
    const mailtoLink = `mailto:${userData.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handleAlreadySent = () => {
    firestore
      .collection("bookings")
      .doc(bookingDetails.id)
      .update({ emailSent: true })
      .then(() => {
        setEmailSent(true);
        console.log("Email sent status updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating email sent status:", error);
      });
  };
  const handleDidNotSend = () => {
    firestore
      .collection("bookings")
      .doc(bookingDetails.id)
      .update({ emailSent: false })
      .then(() => {
        setEmailSent(false);
        console.log("Email sent status updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating email sent status:", error);
      });
  };

  const formattedTimestamp = timestamp
    ? new Date(timestamp.seconds * 1000).toLocaleDateString()
    : "";
  const formattedSelectedDate = selectedDate
    ? new Date(selectedDate.seconds * 1000).toLocaleDateString()
    : "";

  return (
    <div className="booking-card">
      <div className="booking-details">
        <p>
          <strong>Venue location:</strong> {eventSite.location}
        </p>
        <p>
          <strong>Location:</strong> {location}
        </p>
        <p>
          <strong>Selected Date:</strong> {formattedSelectedDate}
        </p>
        <p>
          <strong>Date Booked:</strong> {formattedTimestamp}
        </p>
        <p>
          <strong>Status:</strong> {isPaid ? "Paid" : "Unpaid"}
        </p>
        <p>
          <strong>Booked By: </strong>
        </p>
        {userData && (
          <div className="user-details">
            <p>
              <strong>User Name:</strong> {userData.name}
            </p>
            <p>
              <strong>User Email:</strong> {userData.email}
            </p>
            {/* Add other user details here */}
          </div>
        )}
      </div>
      <div className="card-buttons">
        {emailSent === false || emailSent === undefined ? (
          <>
            <div className="send-email-btn" onClick={handleSendEmail}>
              <SendIcon /> Send Email to client
            </div>
            <div className="email-sent-btn" onClick={handleAlreadySent}>
              <DoneAllIcon /> Email already sent?
            </div>
          </>
        ) : (
          <div className="didnot-send-email" onClick={handleDidNotSend}>
            <GppBadIcon /> Did not send email?
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileBookingCard;
