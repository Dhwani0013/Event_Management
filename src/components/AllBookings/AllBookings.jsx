import React, { useState, useEffect } from "react";
import "./AllBookings.scss";
import BookingCard from "../BookingCard/BookingCard";
import { firestore } from "../../Firebase";
import { useAuth } from "../../authentication";
import Loading from "../Loading/Loading";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getUserId } = useAuth();

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const bookingsRef = firestore.collection("bookings");
        const snapshot = await bookingsRef.where("userId", "==", getUserId()).orderBy("timestamp", "desc").get();

        const userBookings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(userBookings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      }
    };

    if (getUserId()) {
      fetchUserBookings();
    }
  }, [getUserId()]);

  if(loading){
    return <Loading/>
  }

  return (
    <div className="all-bookings">
      <h2>All Bookings</h2>
      {bookings.map((booking) => (
        <BookingCard key={booking.id} eventDetails={booking} />
      ))}
    </div>
  );
};

export default AllBookings;
