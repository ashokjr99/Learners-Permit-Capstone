import React from "react";
import { PieChart, LineChart } from "@mui/x-charts";

let hoursArray = [];
let hoursArrayCount = [];

const Charts = ({ weatherDrivesTotalForEach, results, dayOrNight }) => {
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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "10em",
      }}
    >
      <div>
        <h1 style={{ textDecoration: "underline" }}> Weather Charts </h1>
        {/* if variable is not null, display the part chart  */}
        {weatherDrivesTotalForEach != null ? (
          <PieChart
            slotProps={{
              legend: {
                labelStyle: {
                  fontSize: 14,
                  fill: "#E5E2E3",
                },
              },
            }}
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: weatherDrivesTotalForEach.rainy,
                    label: "Rainy",

                    color: "#D7AD3F",
                  },
                  {
                    id: 1,
                    value: weatherDrivesTotalForEach.snowy,
                    label: "Snowy",

                    color: "#E5E2E3",
                  },
                  {
                    id: 2,
                    value: weatherDrivesTotalForEach.clear,
                    label: "Clear",
                    color: "#5D744F",
                  },
                ],
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            width={400}
            height={250}
          />
        ) : null}

        {dayOrNight != null ? (
          <PieChart
            slotProps={{
              legend: {
                labelStyle: {
                  fontSize: 14,
                  fill: "#E5E2E3",
                },
              },
            }}
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: dayOrNight.day,
                    label: "Day",
                    color: "#E5E2E3",
                  },
                  {
                    id: 1,
                    value: dayOrNight.night,
                    label: "Night",
                    color: "#569AA6",
                  },
                ],
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            width={400}
            height={250}
          />
        ) : null}
      </div>

      <div>
        <h1 style={{ textDecoration: "underline", marginBottom: "1em" }}>
          Drives/Hours Graph
        </h1>
        <LineChart
          slotProps={{
            legend: {
              labelStyle: {
                fontSize: 14,
                fill: "#E5E2E3",
              },
            },
          }}
          xAxis={[
            {
              data: hoursArrayCount,
              label: "DRIVES",
            },
          ]}
          yAxis={[{ label: "HOURS" }]}
          series={[
            {
              data: hoursArray,
              color: "#8C2C43",
              area: true,
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
