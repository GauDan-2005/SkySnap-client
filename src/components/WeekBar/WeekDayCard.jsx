import React from "react";

import styles from "./WeekDayCard.module.css";

const WeekDayCard = ({ temp, date, highTemp, lowTemp }) => {
  const dateObject = new Date(date);

  const fullDay = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    dateObject
  );
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    dateObject
  );
  const day = dateObject.getDate();
  const formattedDate = `${month} ${day}`;

  return (
    <div className={styles.card}>
      <p className={styles.temp}>{temp}°C</p>
      <div className={styles.date_box}>
        <p className={styles.day}>{fullDay}</p>
        <p className={styles.date}>{formattedDate}</p>
      </div>
      <div className={styles.sub_temp_box}>
        <p className={styles.sub_temp_title}>high</p>
        <p className={styles.sub_temp}>{highTemp}°C</p>
      </div>
      <div className={styles.sub_temp_box}>
        <p className={styles.sub_temp_title}>low</p>
        <p className={styles.sub_temp}>{lowTemp}°C</p>
      </div>
    </div>
  );
};

export default WeekDayCard;
