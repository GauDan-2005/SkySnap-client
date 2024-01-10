import React, { useContext } from "react";
import WeatherContext from "../../../context/WeatherContext";

import { img } from "../../../image";
import styles from "./SaveCard.module.css";

const SaveCard = ({ id, location, value, add = false }) => {
  const { setSearchActive, deleteSavedLocation } = useContext(WeatherContext);

  return add ? (
    <div className={styles.add_card} onClick={() => setSearchActive(true)}>
      <p className={styles.add_text}>+</p>
    </div>
  ) : (
    <div className={styles.card}>
      <p className={styles.value}>{value}°C</p>
      <div className={styles.location}>
        <img
          className={styles.location_img}
          src={img.location}
          alt="location"
        />
        <p className={styles.location_text}>{location}</p>
      </div>
      <img
        className={styles.cross_img}
        src={img.close}
        alt="close"
        onClick={() => deleteSavedLocation(location)}
      />
    </div>
  );
};

export default SaveCard;
