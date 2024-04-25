import React, { useEffect, useState } from "react";
import "./Profile.scss";
import EventSiteCard from "../EventSiteCards/EventSiteCards";
import AddEventSiteModal from "../AddEventSite/AddEventSiteModal";
import ProfileBookingCard from "../ProfileBookingCard/ProfileBookingCard";
import { Edit } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { useAuth } from "../../authentication";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  " & .MuiFormControl-root": {
    width: "100%",
    pb: "15px",
  },
  " & .saveAndClear": {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    gap: "10px",
  },
};

const Profile = () => {
  const {
    fetchUserEventSites,
    fetchProfileData,
    updateUserProfile,
    fetchConfirmedBookings,
    fetchEventData,
    fetchOwnerEmail,
  } = useAuth();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(null);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventSites, setEventSites] = useState([]);
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [venueTitle, setVenueTitle] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProfileData(id)
      .then((profileData) => {
        setUser(profileData);
        setEditedUser(profileData);
      })
      .catch((error) => {
        console.error("Error fetching user's profile data:", error);
      });

    fetchUserEventSites()
      .then((userEventSites) => {
        const ids = userEventSites.map((site) => site.id);
        setEventSites(userEventSites);

        fetchConfirmedBookings(id, ids)
          .then((bookingsConfirmed) => {
            console.log("this is the data for bookings, ", bookingsConfirmed);
            setConfirmedBookings(bookingsConfirmed);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching confirmed bookings:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching user's event sites:", error);
      });
  }, [fetchUserEventSites, fetchProfileData, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleDataEdit = (event) => {
    setData(event);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateUserProfile(id, editedUser)
      .then(() => {
        setUser(editedUser);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
      });
  };

  const handleAddEventSite = (newEventSite) => {
    setEventSites([...eventSites, newEventSite]);
  };
  const handleCancel = () => {
    handleClose();
    setEditedUser(user);
    setIsEditing(false);
  };

  if (loading) {
    return <Loading />;
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(user, "dfjdfj");
  return (
    <div className="profile1">
      <Card
      className="profileCard"
        sx={{ maxWidth: "40%", marginTop: "50px !important", margin: "auto" }}
      >
        <CardActionArea>
          <Stack width={'100%'} alignItems={'self-end'} paddingTop={'20px'} pr="20px">       <Button
                className="btn profile-edit-btn"
                width='50%'
                onClick={() => {
                  handleEdit();
                  handleOpen();
                }}
              >
                Edit Profile
              </Button></Stack>
 
          <CardMedia
            component="img"
            height="500"
            width={"100%"}
            image="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"
            alt="green iguana"
            sx={{ height: "auto", width: "50%", margin: "auto" }}
          />
          <CardContent>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Box>
              <Typography gutterBottom variant="h5" component="div" color={"black"}>
              <b>Name: </b> {user?.name}
              </Typography>
              <Typography variant="body2" color={"black"} ><b>Email:</b> {user?.email}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.bio}
              </Typography>
              </Box>
           
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
  
      <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style} display={"block"} gap="10px">
                  <TextField
                    inputProps={{ width: "full" }}
                    width="full"
                    type="text"
                    name="name"
                    value={editedUser?.name}
                    onChange={handleChange}
                  />
                  <TextField
                    width="full"
                    type="text"
                    name="email"
                    disabled
                    value={editedUser?.email}
                  />
                  <TextField
                    width="full"
                    multiline
                    name="bio"
                    value={editedUser?.bio}
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                  />
                  <div className="saveAndClear">
                    <button
                      className="btn profile-edit-btn"
                      onClick={() => {
                        handleSave();
                        handleClose();
                      }}
                    >
                      Save
                    </button>
                    <button
                      className=" btn profile-edit-btn"
                      style={{ backgroundColor: "gray" }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </Box>
              </Modal>
             


            

           
          
        {/* <div className="profile-header">
          <h1>Welcome, {user?.name}</h1>
          {isEditing ? (
            <div className="saveAndClear">
              <button className="save-btn" onClick={handleSave}>
                <SaveIcon className="icon" /> Save
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                <ClearIcon className="icon" /> Cancel
              </button>
            </div>
          ) : (
            <button className="edit-btn" onClick={handleEdit}>
              <Edit className="icon" /> Edit
            </button>
          )}
        </div> */}
        {/* <div className="profile-details">
          <p>
            <strong>Name:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editedUser?.name}
                onChange={handleChange}
              />
            ) : (
              user?.name
            )}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Bio:</strong>
            {isEditing ? (
              <textarea
                name="bio"
                value={editedUser?.bio}
                onChange={handleChange}
                rows="4"
                cols="50"
              />
            ) : (
              user?.bio
            )}
          </p>
        </div> */}
        {user?.role === "organizer" && (
          <div className="event-sites">
            <div className="event-site-header">
              <h2>My Venue Sites</h2>
              <button
                className="btn add-event-site-btn"
                onClick={() => {
                  setVenueTitle("Add");
                  setIsModalOpen(true);
                }}
              >
                Add Venue Site
              </button>
            </div>
            <div className="event-cards">
              {eventSites.map((eventSite) => (
                <EventSiteCard
                  key={eventSite.id}
                  description={eventSite.description}
                  owner={eventSite.owner}
                  location={eventSite.location}
                  showOnly={true}
                  img={eventSite.img}
                  price={`$` + eventSite.price}
                  openEditModal={() => {
                    setVenueTitle("Edit");
                    handleDataEdit(eventSite);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </div>
            {isModalOpen ? (
              <AddEventSiteModal
                title={venueTitle}
                isOpen={isModalOpen}
                data={data}
                onClose={() => {
                  handleDataEdit(null);
                  setIsModalOpen(false);
                }}
                onSave={(newEventSite) => {
                  handleAddEventSite(newEventSite);
                  setIsModalOpen(false);
                }}
              />
            ) : (
              <></>
            )}
          </div>
        )}
        <div className="confirmed-bookings">
          {/* <h2>Confirmed Bookings</h2> */}
          <div className="booking-cards">
            {confirmedBookings != undefined ??
              confirmedBookings.map((booking) => (
                <ProfileBookingCard
                  key={booking.id}
                  bookingDetails={booking}
                  eventSite={eventSites.find(
                    (site) => site.id === booking.eventId
                  )}
                />
              ))}
          </div>
        </div>
      </div>

  );
};

export default Profile;
