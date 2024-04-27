import React, { useEffect, useState } from "react";
import DateFilter from "./DateFilter";
import DayOrNightFilter from "./DayOrNightFilter";
import WeatherFilter from "./WeatherFilter";
import { getAppBarUtilityClass } from "@mui/material";

const FilterHolder = ({ setStartDate, setEndDate, setWeather, setTime }) => {
  //? variables are passed a prop, from Check_stats

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "10%",
      }}
    >
      <DateFilter setStartDate={setStartDate} setEndDate={setEndDate} />
      <DayOrNightFilter setTime={setTime} />
      <WeatherFilter setWeather={setWeather} />
    </div>
  );
};

export default FilterHolder;
