import React, { useContext } from "react";
import WeatherContext from "../../../context/WeatherContext";
import styles from "./TempCard.module.css";

const TempCard = () => {
  const { dailyWeatherData } = useContext(WeatherContext);

  const weatherData = dailyWeatherData?.data[0] || {};

  const { snow, uv, rh: humidity, clouds, temp } = weatherData;
  return (
    <div className={styles.temp_card}>
      <div className={styles.deg_container}>
        <p className={styles.deg}>{temp}°C</p>
      </div>
      <div className={styles.property_container}>
        <div className={styles.ind_prop_cont}>
          <p className={styles.prop_name}>clouds</p>
          <p className={styles.prop_value}>{clouds}%</p>
        </div>
        <div className={styles.ind_prop_cont}>
          <p className={styles.prop_name}>humidity</p>
          <p className={styles.prop_value}>{humidity}%</p>
        </div>
        <div className={styles.ind_prop_cont}>
          <p className={styles.prop_name}>snowfall</p>
          <p className={styles.prop_value}>{snow}mm</p>
        </div>
        <div className={styles.ind_prop_cont}>
          <p className={styles.prop_name}>UV index</p>
          <p className={styles.prop_value}>{uv}</p>
        </div>
      </div>
    </div>
  );
};

export default TempCard;
