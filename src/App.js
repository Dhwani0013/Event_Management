import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import EventSite from "./components/EventSite/EventSite";
import AllBookings from "./components/AllBookings/AllBookings";
import Profile from "./components/Profile/Profile";
import PaymentsPage from "./components/PaymentsPage/PaymentsPage";
import ConfirmedBooking from "./components/ConfirmedBooking/ConfirmedBooking";
import Events from "./components/Events/Events";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/eventsite/:id" element={<EventSite />} />
            <Route path="/bookings" element={<AllBookings />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/payment/:bookingId" element={<PaymentsPage />} />
            <Route path="/confirmedBooking/:bookingId" element={<ConfirmedBooking />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
