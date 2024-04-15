import React, { useState, useEffect } from "react";
import {
  ChartsHolder,
  SummaryHeader,
  StatsFilter,
  FilterHolder,
  CreatePDF,
} from "./check_stats_folder_components";
import { PDFDownloadLink } from "@react-pdf/renderer";

//? Houses the overall look of Checking Stats and Seeing Summaries

const Check_Stats = () => {
  const [results, setResults] = useState([]);
  const [startDate, setStartDate] = useState("2000-01-01");
  const [endDate, setEndDate] = useState("2099-01-01");
  const [weather, setWeather] = useState(false);
  const [time, setTime] = useState(false);
  const [drives, setDrives] = useState(0);
  const [hours, setHours] = useState(0);
  const [weatherDrivesTotalForEach, setWeatherDrivesTotalForEach] =
    useState(null);
  // null so nothing displays while page loads at first

  //? usestate for the user setting their custom range as to when the drive was posted and under what conditions

  //? these are passed as props to the appropriate jsx files in the return below, so that the weather,date, and day can be changes and set on the frontend

  useEffect(() => {
    const getFilter = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/stats/all?startDate=${startDate}&endDate=${endDate}&weather=${weather}&time=${time}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEyNjE2MzIwLCJleHAiOjE3MTI3MDI3MjB9.vSemwbl9TuhJZowh4I3YFcwqELFSw-001EDHFQaBong`,
            },
            // headers: {
            //   Authorization: `Bearer  ${localStorage.getItem("MyToken")}`,
            // },
          }
        );
        const json = await response.json();

        // console.log(json, "herrrrree");

        console.log(json);

        setResults(json.userStats);
        // we used "setResults" to change the state/values that go into the variable "results". we then return "results" in the jsx below.

        setDrives(json.summaryData.totalDrives);
        setHours(json.summaryData.totalHours);
        setWeatherDrivesTotalForEach(json.pieChartData);
      } catch (err) {
        console.log(err);
      }
    };

    getFilter();
  }, [startDate, endDate, weather, time]);

  return (
    <div className="w3-panel w3-card-4 margin-l-p margin-r-p"  style={{marginLeft:"25%"}} >
      <div className="w3-container">
      <h1>Summaries</h1>
      <p>See your drive history in totality</p>

      <FilterHolder
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setTime={setTime}
        setWeather={setWeather}
      />
      <PDFDownloadLink
        document={<CreatePDF results={results} hours={hours} />}
        fileName="FORM"
      >
        {({ loading }) =>
          loading ? (
            <button>Loading Document...</button>
          ) : (
            <button>Download</button>
          )
        }
      </PDFDownloadLink>

      <StatsFilter results={results} />
      <SummaryHeader hours={hours} drives={drives} />
      <ChartsHolder
        weatherDrivesTotalForEach={weatherDrivesTotalForEach}
        results={results}
      />
      </div>
    </div>
  );
};

export default Check_Stats;
