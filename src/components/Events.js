import { useState, useEffect, useCallback } from "react";
import LoadingSpinner from "../UI/LoadingSpinner.js";
import EventsList from "./EventsList.js";
import classes from "./Events.module.css";
import Card from "../UI/Card.js";
import Modal from "../UI/Modal.js";

const Events = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [httpError, setHttpError] = useState();
  const [modalContent, setModalContent] = useState("");

  const generateSelectedEvents = useCallback(() => {
    if (allEvents.length > 0) {
      const filteredSelectedEvents = allEvents.filter(
        (event) => event.selected
      );
      setSelectedEvents(filteredSelectedEvents);
    }
  }, [allEvents]);

  useEffect(() => {
    const fetchEvents = async function () {
      const response = await fetch(
        "https://run.mocky.io/v3/2744c231-8991-4ae8-bc45-1f645437585a"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const eventsData = await response.json();
      const loadedEvents = [];
      for (const key in eventsData) {
        loadedEvents.push({
          ...eventsData[key],
          selected: false,
        });
      }
      setAllEvents(loadedEvents);
      setIsLoading(false);
    };

    fetchEvents().catch((err) => {
      setHttpError(err.message);
      setIsLoading(false);
    });
  }, []);

  const checkTimings = function (startTime, endTime) {
    let allowed = true;
    selectedEvents.forEach((event) => {
      if (event.start_time < endTime && startTime < event.end_time) {
        setModalContent(
          "You already have enrolled to one event which clashes with this event's time"
        );
        allowed = false;
      }
    });
    return allowed;
  };

  const selectEventHandler = (id) => {
    if (selectedEvents.length === 3) {
      setModalContent("You can enroll to a maximum of three events");
      return;
    }
    const clickedEvent = allEvents.find((event) => event.id === id);
    let startTime = clickedEvent.start_time;
    let endTime = clickedEvent.end_time;
    let canBeAdded = checkTimings(startTime, endTime);
    if (canBeAdded) {
      const updatedEvents = allEvents.map((curr) => {
        if (curr.id === id) {
          curr.selected = true;
        }
        return curr;
      });
      setAllEvents(updatedEvents);
      generateSelectedEvents();
    }
  };

  const removeEventHandler = (id) => {
    const updatedEvents = allEvents.map((curr) => {
      if (curr.id === id) {
        curr.selected = false;
      }
      return curr;
    });
    setAllEvents(updatedEvents);
    generateSelectedEvents();
  };

  const closeModal = function () {
    setModalContent("");
  };

  if (isLoading) {
    return (
      <section>
        <LoadingSpinner />
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.centered}>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <Card className={classes.eventsBox}>
      {modalContent && <Modal onClose={closeModal}>{modalContent}</Modal>}
      <Card className={classes.allEvents}>
        <h4 className={classes.subheader}>All Events</h4>
        <EventsList
          selectedList={false}
          events={allEvents}
          onAdd={selectEventHandler}
        ></EventsList>
      </Card>
      <Card className={classes.selectedEvents}>
        <h4 className={classes.subheader}>Selected Events</h4>
        <EventsList
          selectedList={true}
          events={selectedEvents}
          onRemove={removeEventHandler}
        ></EventsList>
      </Card>
    </Card>
  );
};

export default Events;
