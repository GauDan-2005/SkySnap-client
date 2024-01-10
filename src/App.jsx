import { useContext } from "react";
import WeekBar from "./components/WeekBar/WeekBar";
import LeftBar from "./components/LeftBar/LeftBar";
import CenterCard from "./components/CenterCard/CenterCard";
import SavedLocation from "./components/savedLocations/SavedLocation";
import SearchBox from "./components/SearchBox/SearchBox";
import Error from "./components/ErrorModal/Error";
import WeatherContext from "./context/WeatherContext";

import styles from "./App.module.css";

function App() {
  const { searchActive, errorActive } = useContext(WeatherContext);
  return (
    <div className={styles.app}>
      <div className={styles.top_bar}>
        <div className={styles.main}>
          <LeftBar />
          <hr className={styles.v_line} />
          <CenterCard />
        </div>
        <hr className={styles.h_line_inside} />
        <SavedLocation />
      </div>
      <hr className={styles.h_line} />
      <WeekBar />
      {searchActive && <SearchBox />}
      {errorActive && <Error />}
    </div>
  );
}

export default App;
