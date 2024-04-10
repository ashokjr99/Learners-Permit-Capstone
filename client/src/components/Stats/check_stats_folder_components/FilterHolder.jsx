import React, { useEffect, useState } from "react";
import DateFilter from "./DateFilter";
import DayOrNightFilter from "./DayOrNightFilter";
import WeatherFilter from "./WeatherFilter";

const FilterHolder = ({ setStartDate, setEndDate, setWeather, setTime }) => {
  //? variables are passed a prop, from Check_stats

  return (
    <div>
      <DateFilter setStartDate={setStartDate} setEndDate={setEndDate} />
      <DayOrNightFilter setTime={setTime} />
      <WeatherFilter setWeather={setWeather} />
    </div>
  );
};

export default FilterHolder;
