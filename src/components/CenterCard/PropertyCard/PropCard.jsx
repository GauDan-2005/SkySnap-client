import React from "react";

import styles from "./PropCard.module.css";

const PropCard = ({ title, subTitle, value, img, imgVal, metrics }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_text}>
        <p className={styles.title}>{title}</p>
        {subTitle && <p className={styles.sub_title}>{subTitle}</p>}
        <p className={styles.value}>
          {value}
          <span className={styles.value}>{metrics}</span>
        </p>
      </div>
      <img className={styles.card_img} src={img} alt={title} />
    </div>
  );
};

export default PropCard;
