import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import "./Navbar.scss";
import { useAuth } from "../../authentication";
import { Link, useNavigate } from "react-router-dom";
import { auth, firestore } from "../../Firebase";

const Navbar = () => {
  const { logout, getUserId, getUserDisplayName } = useAuth();
  const [userInitials, setUserInitials]=useState("");
  const navigate = useNavigate();

  const userName = getUserDisplayName(getUserId());
  userName.then((resolvedUserName) => {
    const initials = resolvedUserName
      .split(" ")
      .map((name) => name[0])
      .join("");
      setUserInitials(initials);
  });

  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleProfileClick= ()=>{
    navigate(`/profile/${getUserId()}`);
  }

  const handleBrandClick=()=>{
    navigate('/');
  }
  

  return (
    <nav className="navbar">
      <div className="brand" onClick={handleBrandClick}>Event Crafters</div>
      <div className="buttons">
        <Link to='/bookings' className="nav-btn">
          <StickyNote2Icon titleAccess="All Bookings" />
        </Link>
        <button className="nav-btn" onClick={handleProfileClick}>
          <Avatar>{userInitials}</Avatar>
        </button>
        <button className="nav-btn" onClick={handleLogout}>
          <ExitToAppIcon titleAccess="Logout" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;