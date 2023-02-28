import React from "react";
import classes from "./EventsList.module.css";
import EventCard from "../EventCard/EventCard.js";

const EventsList = (props) => {
  return (
    <section
      className={`${classes.events} ${
        props.selectedList ? classes.selectedEventsList : classes.allEventsList
      }`}
    >
      {props.events.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          name={event.event_name}
          category={event.event_category}
          startTime={event.start_time}
          endTime={event.end_time}
          selected={event.selected}
          selectedCard={!props.selectedList}
          onClick={props.selectedList ? props.onRemove : props.onAdd}
        ></EventCard>
      ))}
    </section>
  );
};

export default React.memo(EventsList);
