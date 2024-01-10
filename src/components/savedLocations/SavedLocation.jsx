import React, { useContext } from "react";
import SaveCard from "./SaveCard/SaveCard";
import WeatherContext from "../../context/WeatherContext";

import styles from "./SavedLocation.module.css";

const SavedLocation = () => {
  const { savedLocationList } = useContext(WeatherContext);

  return (
    <div className={styles.saved_location}>
      <p className={styles.heading}>Saved Locations</p>
      <div className={styles.cards_container}>
        {savedLocationList.map((locationData) => {
          const weatherData = locationData?.data[0] || {};
          const { city_name, temp } = weatherData;
          return (
            <SaveCard
              key={city_name}
              id={city_name}
              location={city_name}
              value={temp}
            />
          );
        })}
        {savedLocationList.length < 4 && <SaveCard add={true} />}
        <SaveCard location="delhi" value={12} />
        <SaveCard location="delhi" value={12} />
        <SaveCard location="delhi" value={12} />
      </div>
    </div>
  );
};

export default SavedLocation;
