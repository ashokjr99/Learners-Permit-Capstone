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
                },
                {
                  id: 1,
                  value: weatherDrivesTotalForEach.snowy,
                  label: "Snowy",
                },
                {
                  id: 2,
                  value: weatherDrivesTotalForEach.clear,
                  label: "Clear",
                },
              ],
            },
          ]}
          width={800}
          height={400}
        />
      ) : null}

      <div>
        <h1>Drives and Hours Chart</h1>
        <LineChart
          xAxis={[
            {
              data: hoursArrayCount,
              label: "Days",
            },
          ]}
          yAxis={[{ label: "Hours" }]}
          series={[
            {
              data: hoursArray,
              // yAxis,
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </div>
  );
};

export default Charts;

// [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
//   19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
// ],
