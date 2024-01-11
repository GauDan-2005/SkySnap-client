import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherContext = React.createContext([]);

export const WeatherContextProvider = (props) => {
  // API VARIABLES
  const apiKey = process.env.REACT_APP_WEATHER_API;
  const currentWeatherUrl = process.env.REACT_APP_WEATHER_CURRENT_URL;
  const dailyWeatherUrl = process.env.REACT_APP_WEATHER_DAY_URL;

  // WEATHER DATA VARIABLES
  const [savedLocationList, setSavedLocationList] = useState([]);
  const [currLocation, setCurrLocation] = useState({
    latitude: 0,
    longitude: 0,
    city: "",
    country: "",
  });
  // const [currWeatherData, setCurrWeatherData] = useState(null);
  const [dailyWeatherData, setDailyWeatherData] = useState(null);

  // COMMON USE VARIABLES
  const [searchActive, setSearchActive] = useState(false);

  // ERROR VARIABLES
  const [error, setError] = useState(null);
  const [errorActive, setErrorActive] = useState(false);

  // API CALL
  const [apiCallDaily, setAPICallDaily] = useState(true);

  // FUNCTIONS
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrLocation((prev) => ({
          ...prev,
          latitude: latitude,
          longitude: longitude,
        }));
        setTimeout(() => setAPICallDaily(false), 500);
      },
      (err) => {
        setError(err.message);
        setErrorActive(true);
      }
    );
  };

  const addSavedLocation = async (cityName) => {
    if (!apiKey || !currentWeatherUrl) {
      setError("API key or URL is not defined.");
      return;
    }
    try {
      const response = await axios.get(currentWeatherUrl, {
        params: {
          city: cityName,
          key: apiKey,
        },
      });

      setSavedLocationList((prev) => [...prev, response.data]);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setErrorActive(true);
    }
  };

  const deleteSavedLocation = (cityName) => {
    setSavedLocationList((prev) => {
      console.log(prev);
      return prev
        ? prev.filter((w_data) => w_data?.data[0]?.city_name !== cityName)
        : prev;
    });
  };

  // TO GET LOCATION-LOCAL
  useEffect(() => {
    if (navigator.geolocation) {
      getLocation();
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  // TO FETCH WEATHER-DATA
  useEffect(() => {
    const fetchDailyWeatherData = async () => {
      if (apiCallDaily) {
        return;
      }
      if (!apiKey || !dailyWeatherUrl) {
        setError("API key or URL is not defined.");
        return;
      }
      try {
        const response = await axios.get(dailyWeatherUrl, {
          params: {
            lat: currLocation.latitude,
            lon: currLocation.longitude,
            days: 7,
            key: apiKey,
          },
        });
        setDailyWeatherData(response.data);
        setAPICallDaily(true);
      } catch (error) {
        setError(error.message);
        setErrorActive(true);
      }
    };
    fetchDailyWeatherData();
  }, [
    apiCallDaily,
    apiKey,
    currLocation.latitude,
    currLocation.longitude,
    dailyWeatherUrl,
  ]);

  // TO GET CITY NAME
  useEffect(() => {
    const getCityName = () => {
      try {
        setCurrLocation((prev) => ({
          ...prev,
          city: dailyWeatherData?.city_name || "",
          country: dailyWeatherData?.country_code || "",
        }));
      } catch (error) {
        console.log(error);
        setError(error.message);
        setErrorActive(true);
      }
    };
    getCityName();
  }, [dailyWeatherData]);

  return (
    <WeatherContext.Provider
      value={{
        dailyWeatherData,
        savedLocationList,
        currLocation,
        addSavedLocation,
        searchActive,
        setSearchActive,
        error,
        setError,
        errorActive,
        setErrorActive,
        deleteSavedLocation,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
