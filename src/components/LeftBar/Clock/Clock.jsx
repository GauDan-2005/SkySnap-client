import React, { useEffect, useState } from "react";

import styles from "./Clock.module.css";

const Clock = () => {
  const [time, setTime] = useState({
    hour: { h1: 0, h2: 0 },
    min: { m1: 0, m2: 0 },
  });

  useEffect(() => {
    const updateTime = () => {
      const currentDate = new Date();
      const currentHours = currentDate.getHours();
      const hr1 = Math.floor(currentHours / 10);
      const hr2 = currentHours % 10;
      const currentMinutes = currentDate.getMinutes();
      const min1 = Math.floor(currentMinutes / 10);
      const min2 = currentMinutes % 10;
      setTime({ hour: { h1: hr1, h2: hr2 }, min: { m1: min1, m2: min2 } });
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.clock_outer_box}>
      <div className={styles.clock_inner_box}>
        <div className={styles.clock_text_box_1}>
          <p className={styles.clock_text}>{time.hour.h1}</p>
        </div>
        <div className={styles.clock_text_box_2}>
          <p className={styles.clock_text}>{time.hour.h2}</p>
        </div>
      </div>
      <div className={styles.clock_inner_box}>
        <div className={styles.clock_text_box_1}>
          <p className={styles.clock_text}>{time.min.m1}</p>
        </div>
        <div className={styles.clock_text_box_2}>
          <p className={styles.clock_text}>{time.min.m2}</p>
        </div>
      </div>
    </div>
  );
};

export default Clock;
