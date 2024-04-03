import React, { useEffect, useState } from "react";
import DateFilter from "./DateFilter";
import DayOrNightFilter from "./DayOrNightFilter";
import WeatherFilter from "./WeatherFilter";

const FilterHolder = ({ setResults }) => {
  //? setResults is passed a prop, from StatsFilter

  const [startDate, setStartDate] = useState("2000-01-01");
  const [endDate, setEndDate] = useState("2099-01-01");
  const [weather, setWeather] = useState(false);
  const [time, setTime] = useState(false);

  //? usestate for the user setting their custom range as to when the drive was posted and under what conditions

  //? these are passed as props to the appropriate jsx files in the return below, so that the weather,date, and day can be changes and set on the frontend

  useEffect(() => {
    const getFilter = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/stats/all?startDate=${startDate}&endDate=${endDate}&weather=${weather}&time=${time}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEyMDk0NTE3LCJleHAiOjE3MTIxODA5MTd9.I0J3tWazPfKBEoACEI0QXlJcJxs46AwrXqTARcQWuH8`,
            },
            // headers: {
            //   Authorization: `Bearer  ${localStorage.getItem("MyToken")}`,
            // },
          }
        );
        const json = await response.json();

        // console.log(json, "herrrrree");

        console.log(json);

        setResults(json);
        // we used "setResults" to change the state/values that go into the variable "results". we then return "results" in the jsx below.
      } catch (err) {
        console.log(err);
      }
    };

    getFilter();
  }, [startDate, endDate, weather, time]);

  return (
    <div>
      <DateFilter setStartDate={setStartDate} setEndDate={setEndDate} />
      <DayOrNightFilter setTime={setTime} />
      <WeatherFilter setWeather={setWeather} />
    </div>
  );
};

export default FilterHolder;
