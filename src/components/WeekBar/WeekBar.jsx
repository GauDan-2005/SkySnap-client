import React, { useContext } from "react";
import WeatherContext from "../../context/WeatherContext";
import WeekDayCard from "./WeekDayCard";

import styles from "./WeekBar.module.css";

const WeekBar = () => {
  const { dailyWeatherData } = useContext(WeatherContext);

  const newDailyWeatherData = dailyWeatherData?.slice(1) || [];

  return (
    <div className={styles.week_box}>
      <p className={styles.week_title}>next 7 days</p>
      <div className={styles.day_card_container}>
        {newDailyWeatherData &&
          newDailyWeatherData?.data?.map((weatherData) => (
            <WeekDayCard
              key={weatherData.valid_date}
              temp={weatherData.temp}
              day={weatherData.valid_date}
              date={weatherData.valid_date}
              highTemp={weatherData.max_temp}
              lowTemp={weatherData.min_temp}
            />
          ))}
        <WeekDayCard temp={12} date={"2024-01-10"} highTemp={12} lowTemp={12} />
        <WeekDayCard temp={12} date={"2024-01-10"} highTemp={12} lowTemp={12} />
        <WeekDayCard temp={12} date={"2024-01-10"} highTemp={12} lowTemp={12} />
        <WeekDayCard temp={12} date={"2024-01-10"} highTemp={12} lowTemp={12} />
        <WeekDayCard temp={12} date={"2024-01-10"} highTemp={12} lowTemp={12} />
        <WeekDayCard temp={12} date={"2024-01-10"} highTemp={12} lowTemp={12} />
      </div>
    </div>
  );
};

export default WeekBar;
