import React from "react";

import Clock from "./Clock/Clock";
import Logo from "./Logo/Logo";
import TempCard from "./TempCard/TempCard";

import styles from "./LeftBar.module.css";

const LeftBar = () => {
  return (
    <div className={styles.outer_box}>
      <Logo />
      <Clock />
      <TempCard />
    </div>
  );
};

export default LeftBar;
