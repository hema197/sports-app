import React from "react";
import Card from "../../Atomic/Card/Card";
import Button from "../../Atomic/Button/Button";
import classes from "./EventCard.module.css";
import { formatTime } from "../../../utils";

const EventCard = (props) => {
  const actionHandler = function () {
    props.onClick(props.id);
  };

  return (
    <Card
      className={`${classes.event} ${
        props.selected
          ? props.selectedCard
            ? classes.selectedCard
            : classes.selected
          : ""
      }`}
    >
      <section className={classes.specifications}>
        <section className={classes.eventCategory}>
          <div style={{ fontSize: "2em", fontWeight: 800 }}>
            {props.category[0].toUpperCase()}
          </div>
        </section>
        <section className={classes.eventDetails}>
          <p className={classes.eventName} style={{ fontWeight: 600 }}>
            {props.name}
          </p>
          <p className={classes.fullCategory}>{props.category}</p>
          <p className={classes.time} style={{ fontWeight: 600 }}>
            {formatTime(props.startTime.slice(11, 16))}-
            {formatTime(props.endTime.slice(11, 16))}
          </p>
        </section>
      </section>
      <section className={classes.actionButton}>
        <Button
          className={`${classes.add} ${
            props.selected && !props.selectedCard ? classes.remove : ""
          }`}
          onClick={actionHandler}
          disabled={props.selected && props.selectedCard}
          tabIndex={props.id}
        >
          {props.selected
            ? props.selectedCard
              ? "Selected"
              : "Remove"
            : "Select"}
        </Button>
      </section>
    </Card>
  );
};

export default React.memo(EventCard);
