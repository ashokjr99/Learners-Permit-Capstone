import React from "react";
import { PieChart, LineChart } from "@mui/x-charts";

let hoursArray = [];
let hoursArrayCount = [];

const Charts = ({ weatherDrivesTotalForEach, results }) => {
  //? the if statement bypasses the react delay so that results does not defaultly shows as an empty array

  if (results.length != 0) {
    //? plucks out the hours in each drive and stores in hoursArray array

    hoursArray = results.map((obj) => obj.hours);
    // console.log(results, "resultssss");
    // console.log(hoursArray, "hours array");

    //? making an array (hoursArrayCount), which counts how large the hoursArray is

    for (let i = 0; i <= hoursArray.length; i++) {
      hoursArrayCount.push(i + 1);
    }
    // console.log(hoursArrayCount);
  }

  return (
    <div>
      <h1>Weather Chart</h1>
      {/* if variable is not null, display the part chart  */}
      {weatherDrivesTotalForEach != null ? (
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: weatherDrivesTotalForEach.rainy,
                  label: "Rainy",
                  color: "#244855",
                },
                {
                  id: 1,
                  value: weatherDrivesTotalForEach.snowy,
                  label: "Snowy",
                  color: "#c1c8e4",
                },
                {
                  id: 2,
                  value: weatherDrivesTotalForEach.clear,
                  label: "Clear",
                  color: "#e64833",
                },
              ],
            },
          ]}
          width={400}
          height={250}
        />
      ) : null}

      <div>
        <h1>Drives/Hours Graph</h1>
        <LineChart
          xAxis={[
            {
              data: hoursArrayCount,
              label: "Drives",
            },
          ]}
          yAxis={[{ label: "Hours" }]}
          series={[
            {
              data: hoursArray,
              color: "#244855",
              // yAxis,
            },
          ]}
          width={650}
          height={400}
        />
      </div>
    </div>
  );
};

export default Charts;
