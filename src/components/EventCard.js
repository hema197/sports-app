import React from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./EventCard.module.css";

const EventCard = (props) => {
  const actionHandler = function () {
    if (props.selected && props.selectedCard) {
      return;
    }
    props.onClick(props.id);
  };

  const formatTime = function (time) {
    let formattedTime;
    let hr_24 = Number(time.slice(0, 2));
    let min = time.slice(3);
    let hr_12 = hr_24 % 12;
    if (hr_12 === 0) hr_12 = 12;
    formattedTime = `${hr_12}:${min} ${hr_24 < 12 ? "am" : "pm"}`;
    return formattedTime;
  };
  
  return (
    <Card
      className={
        props.selected
          ? props.selectedCard
            ? `${classes.event} ${classes.selectedCard}`
            : `${classes.event} ${classes.selected}`
          : `${classes.event}`
      }
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
          className={
            props.selected
              ? props.selectedCard
                ? `${classes.add}`
                : `${classes.remove}`
              : `${classes.add}`
          }
          onClick={actionHandler}
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
