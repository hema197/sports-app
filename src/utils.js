export const formatTime = function (time) {
  let formattedTime;
  let hr_24 = Number(time.slice(0, 2));
  let min = time.slice(3);
  let hr_12 = hr_24 % 12;
  if (hr_12 === 0 && hr_24 !== 0) hr_12 = 12;
  formattedTime = `${hr_12}:${min} ${hr_24 < 12 ? "am" : "pm"}`;
  return formattedTime;
};

export const checkTimings = function (events, startTime, endTime) {
  let allowed = true;
  events.forEach((event) => {
    if (
      (event.start_time < startTime && startTime < event.end_time) ||
      (event.start_time < endTime && endTime < event.end_time) ||
      (event.start_time === startTime && endTime === event.end_time) ||
      (event.start_time > startTime && endTime > event.end_time)
    ) {
      allowed = false;
    }
  });
  return allowed;
};
