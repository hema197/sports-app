import React from "react";
import classes from "./EventsList.module.css";
import EventCard from "./EventCard.js";

const EventsList = (props) => {
  return (
    <section
      className={
        props.selectedList
          ? `${classes.events} ${classes.selectedEventsList}`
          : `${classes.events} ${classes.allEventsList}`
      }
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
