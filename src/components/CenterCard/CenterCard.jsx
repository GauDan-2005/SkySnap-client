import React, { useContext } from "react";
import WeatherContext from "../../context/WeatherContext";
import PropCard from "./PropertyCard/PropCard";

import { img, weatherIcons } from "../../image";

import styles from "./CenterCard.module.css";

const CenterCard = () => {
  const { dailyWeatherData, currLocation } = useContext(WeatherContext);

  const weatherData = dailyWeatherData?.data[0] || {};

  const {
    weather,
    wind_cdir_full,
    wind_spd,
    vis: visibility,
    pres: pressure,
    precip,
  } = weatherData;

  return (
    <div className={styles.center_card}>
      <div className={styles.desc_bar}>
        <div className={styles.location}>
          {currLocation.city !== "" && (
            <img
              className={styles.location_img}
              src={img.location}
              alt="location"
            />
          )}
          <p className={styles.location_text}>
            {currLocation.city === "" ? "Loading" : currLocation.city}
          </p>
        </div>
        <div className={styles.description}>
          {weather?.icon !== undefined && (
            <img
              className={styles.desc_img}
              src={weatherIcons[weather?.icon]}
              alt="weather_icon"
            />
          )}
          <p className={styles.desc_text}>
            {weather?.description === undefined
              ? "Loading"
              : weather?.description}
          </p>
        </div>
      </div>
      <div className={styles.card_box}>
        <div className={styles.inner_card_box}>
          <PropCard
            title="Pressure"
            value={pressure}
            img={img.pressure}
            metrics="mb"
          />
          <PropCard
            title="Rain Probability"
            value={precip}
            img={img.rain}
            metrics="%"
          />
        </div>
        <div className={styles.inner_card_box}>
          <PropCard
            title="Wind"
            subTitle={wind_cdir_full}
            value={wind_spd?.toFixed(2)}
            img={img.direction}
            metrics="m/s"
          />
          <PropCard
            title="Visibility"
            value={visibility?.toFixed(1)}
            img={img.visibility}
            metrics="km"
          />
        </div>
      </div>
    </div>
  );
};

export default CenterCard;
