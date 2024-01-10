import React from "react";
import styles from "./Logo.module.css";
const Logo = () => {
  return (
    <div className={styles.logo_box}>
      <p className={styles.logo_text}>SkySnap</p>
    </div>
  );
};

export default Logo;
