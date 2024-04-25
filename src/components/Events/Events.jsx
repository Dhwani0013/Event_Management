import React, { useEffect, useState } from "react";
import "./Events.scss";
import EventSiteCard from "../EventSiteCards/EventSiteCards";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../authentication";
import Loading from "../Loading/Loading";
import NoEventsFound from "../NoEventsFound/NoEventsFound";

const Events = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("id"), "dgjkdfkjg");
  const { fetchAllEventSites } = useAuth();
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(true);
  const [eventSites, setEventSites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
console.log(events,"fjkgkdk")
  useEffect(() => {
    const getAllEventSites = async () => {
      try {
        const eventSitesData = await fetchAllEventSites();
        setEventSites(eventSitesData);
        setLoading(false);
      } catch (error) {
        console.error("Error getting all Venue sites:", error);
      }
    };

    getAllEventSites();
  }, [fetchAllEventSites]);

  useEffect(() => {
    if (eventSites.length > 0) {
      const id = searchParams.get("id");

      let eventsList = [];
      if (id) {
        eventsList=  eventSites.filter((event) => {
          return (
            event.category == id &&
            event.location.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });
      } else {
      eventsList=  eventSites.filter((event) => {
          return (
            event.location.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });
      }
      setEvents(eventsList);
    }
  }, [searchParams, eventSites]);

  // const filteredEventSites = eventSites.filter((eventSite) =>
  //   eventSite.location.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const navigate = useNavigate();

  const handleBookNowClick = (id) => {
    navigate(`/eventsite/${id}`);
  };
  const handleSearch = () => {
    if (eventSites.length > 0) {
      const id = searchParams.get("id");
      let eventsList = [];
      if (id) {
        eventsList = eventSites.filter((event) => {
          return (
            event.category == id &&
            event.location.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });
      } else {
        eventsList = eventSites.filter((event) => {
          return event.location
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        });
      }
      setEvents(eventsList);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return events && events.length ? (
    <div className="dashboard">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search venue's sites..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="event-sites">
        {events.map((eventSite) => (
          <EventSiteCard
            key={eventSite.id}
            location={eventSite.location}
            description={eventSite.description}
            owner={eventSite.owner}
            img={eventSite.img}
            onBookNowClick={() => handleBookNowClick(eventSite.id)}
          />
        ))}
      </div>
    </div>
  ) : (
    <NoEventsFound />
  );
};

export default Events;
