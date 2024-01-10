import React, { useContext } from "react";
import Button from "../Button/Button";
import WeatherContext from "../../context/WeatherContext";

import styles from "./Error.module.css";

const Error = () => {
  const { error, setError, setErrorActive } = useContext(WeatherContext);

  const errorhandler = () => {
    setErrorActive(false);
    setError(null);
  };

  return (
    <div className={styles.err}>
      <div className={styles.modal} />
      <div className={styles.err_container}>
        <p className={styles.heading}>error!</p>
        <p className={styles.error}>{error}</p>
        <Button btnFunction={errorhandler} title="Okay" />
      </div>
    </div>
  );
};

export default Error;
