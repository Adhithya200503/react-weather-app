

import React, { useEffect, useState } from "react";
import { WiThermometer, WiHumidity, WiBarometer } from "react-icons/wi";

import axios from "axios";

export const WeatherComponent = () => {
  const [City, setCity] = useState("chennai");
  const [WeatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (city) => {
    setLoading(true);
    try {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      console.log(response.data);
      setWeatherData(response.data);
    } catch (error) {
      console.error(`Unable to fetch data: ${error}`);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);
    if (newCity) {
      fetchData(newCity);
    } else {
      setWeatherData(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (City) {
      fetchData(City);
    }
  }, [City]);

  return (
    <div>
      <div className="font-mono h-auto   bg-slate-100 border border-red overflow-hidden shadow-lg rounded w-[400] ">
        <div className="text-center text-white bg-blue-500 flex items-center p-4 ">
          <p className="font-[25px] pe-3">
            {WeatherData ? `Weather in ${WeatherData.name}` : "Enter a city"}
          </p>
          <input
            type="text"
            className="p-1 border border-none outline-none text-black gap-3 ms-auto rounded  "
            placeholder="enter the city name"
            value={City}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex flex-row items-center justify-center p-4 gap-3">
          {loading ? (
            <p className="p-1 bg-slate-200 rounded-xl">Loading...</p>
          ) : WeatherData ? (
            <>
              <p className="cursor-pointer p-1 bg-slate-200 rounded-xl flex items-center">
                <WiThermometer size={30} color="red" />
                {` Temp: ${WeatherData.main.temp} °C`}
              </p>
              <p className="cursor-pointer p-1 bg-slate-200 rounded-xl flex items-center">
                <WiHumidity size={30} color="blue" />
                {` Humidity: ${WeatherData.main.humidity}%`}
              </p>
              <p className="cursor-pointer p-1 bg-slate-200 rounded-xl flex items-center">
                <WiBarometer size={30} color="green" />
                {` Sea Level: ${WeatherData.main.sea_level} hPa`}
              </p>
              <p className="cursor-pointer p-1 bg-slate-200 rounded-xl flex items-center">
                <span role="img" aria-label="country">
                  🌍
                </span>
                {` Country: ${WeatherData.sys.country}`}
              </p>
            </>
          ) : (
            <p className="p-1 bg-slate-200 rounded-xl">Enter a valid city</p>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};
