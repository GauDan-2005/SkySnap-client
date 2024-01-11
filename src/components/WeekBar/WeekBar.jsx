import React, { useContext } from "react";
import WeatherContext from "../../context/WeatherContext";
import WeekDayCard from "./WeekDayCard";

import styles from "./WeekBar.module.css";

const WeekBar = () => {
  const { dailyWeatherData } = useContext(WeatherContext);
  const newDailyWeatherData = dailyWeatherData?.data?.slice(1) || [];

  return (
    <div className={styles.week_box}>
      <p className={styles.week_title}>next 6 days</p>
      <div className={styles.day_card_container}>
        {newDailyWeatherData &&
          newDailyWeatherData?.map((weatherData) => (
            <WeekDayCard
              key={weatherData.valid_date}
              temp={weatherData.temp}
              day={weatherData.valid_date}
              date={weatherData.valid_date}
              highTemp={weatherData.max_temp}
              lowTemp={weatherData.min_temp}
            />
          ))}
      </div>
    </div>
  );
};

export default WeekBar;
