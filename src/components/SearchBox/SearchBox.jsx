import React, { useContext, useState } from "react";
import Button from "../Button/Button";
import WeatherContext from "../../context/WeatherContext";

import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const { setSearchActive, addSavedLocation } = useContext(WeatherContext);
  const [location, setLocation] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);
  };

  const handleFormSubmit = () => {
    addSavedLocation(location);
    cancelFormSubmit();
  };

  const cancelFormSubmit = () => {
    setLocation("");
    setSearchActive(false);
  };

  return (
    <div className={styles.search_box}>
      <div className={styles.modal} onClick={cancelFormSubmit} />
      <div className={styles.search_form}>
        <input
          className={styles.search_input}
          onChange={handleInputChange}
          type="text"
          name="location"
          value={location}
          placeholder="search locations..."
          autoComplete="off"
        />
        <div className={styles.btn_container}>
          <Button title="Cancel" btnFunction={cancelFormSubmit} />
          <Button title="Done" btnFunction={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
