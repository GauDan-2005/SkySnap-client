import React, { useState, useEffect, useCallback } from "react";
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

  // const fetchCurrWeatherData = useCallback(async () => {
  //   if (!apiKey || !currentWeatherUrl) {
  //     setError("API key or URL is not defined.");
  //     return;
  //   }
  //   try {
  //     const response = await axios.get(currentWeatherUrl, {
  //       params: {
  //         lat: currLocation.latitude,
  //         lon: currLocation.longitude,
  //         key: apiKey,
  //       },
  //     });
  //     setCurrWeatherData(response.data);
  //   } catch (error) {
  //     console.log(error);
  //     setError(error.message);
  //     setErrorActive(true);
  //   }
  // }, [
  //   apiKey,
  //   currentWeatherUrl,
  //   currLocation.latitude,
  //   currLocation.longitude,
  // ]);

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
    setDailyWeatherData((prev) => {
      prev?.filter((w_data) => w_data?.data[0]?.city_name !== cityName);
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
      // const weatherData = dailyWeatherData?
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

  // TRYING NEW API
  // useEffect(() => {
  //   const fetchDataDiff = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://api.weatherapi.com/v1/current.json",
  //         {
  //           params: {
  //             q: `${currLocation.latitude},${currLocation.longitude}`,
  //             days: 7,
  //             key: "6da447ef8f8c462c99031953241001",
  //           },
  //         }
  //       );
  //       console.log(response.data);
  //       // setDailyWeatherData(response.data);
  //     } catch (error) {
  //       setError(error.message);
  //       setErrorActive(true);
  //     }
  //   };
  //   fetchDataDiff();
  // }, [apiKey, currLocation.latitude, currLocation.longitude]);

  // // console logging
  // console.log(currLocation);
  // console.log(dailyWeatherData);
  // console.log(error);

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
