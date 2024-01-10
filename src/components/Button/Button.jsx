import React from "react";
import styles from "./Buton.module.css";

const Button = ({ btnFunction, title }) => {
  return (
    <div className={styles.btn} onClick={() => btnFunction()}>
      <p className={styles.btn_text}>{title}</p>
    </div>
  );
};

export default Button;
