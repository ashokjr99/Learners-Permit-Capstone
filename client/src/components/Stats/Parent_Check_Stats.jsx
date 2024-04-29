import React, { useState, useEffect } from "react";
import {
  SummaryHeader,
  StatsChartHolder,
  FilterHolder,
  CreatePDF,
  Awaiting_Stats,
} from "./check_stats_folder_components";
import { PDFDownloadLink } from "@react-pdf/renderer";

//? Houses the overall look of Checking Stats and Seeing Summaries

const Parent_Check_Stats = () => {
  const [results, setResults] = useState([]);
  const [reFetch, setReFetch] = useState(false);
  const [startDate, setStartDate] = useState("2000-01-01");
  const [endDate, setEndDate] = useState("2099-01-01");
  const [weather, setWeather] = useState(false);
  const [time, setTime] = useState(false);
  const [drives, setDrives] = useState(0);
  const [hours, setHours] = useState(0);
  const [approval, setApproval] = useState(false);
  // null so nothing displays while page loads at first

  //? usestate for the user setting their custom range as to when the drive was posted and under what conditions

  //? these are passed as props to the appropriate jsx files in the return below, so that the weather,date, and day can be changes and set on the frontend

  useEffect(() => {
    const getFilter = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/stats/child_stats?startDate=${startDate}&endDate=${endDate}&weather=${weather}&time=${time}&approval=${approval}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("MyToken")}`,
            },
          }
        );
        const json = await response.json();

        console.log(json);
        console.log(json.userStats);
        setResults(json.userStats);
        // we used "setResults" to change the state/values that go into the variable "results". we then return "results" in the jsx below.

        setDrives(json.summaryData.totalDrives);
        setHours(json.summaryData.totalHours);
      } catch (err) {
        console.log(err);
      }
    };

    getFilter();
  }, [startDate, endDate, weather, time, approval, reFetch]);

  return (
    <div
      className="roboto-regular"
      style={{
        marginLeft: "15%",
        marginBottom: "5%",
        marginRight: "3%",
        display: "flex",
        flexDirection: "column",
        gap: "5em",
      }}
    >
      <div>
        <h1>Drives</h1>
        <p>See your child's drive history in totality</p>
      </div>

      <div style={{ display: "flex", flexDirection: "row", gap: "50%" }}>
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
      </div>

      <div>
        <h1>Approved</h1>
        <StatsChartHolder results={results} setReFetch={setReFetch} />
      </div>

      <div>
        <h1>Pending Approval</h1>
        <Awaiting_Stats results={results} setReFetch={setReFetch} />
        {/* stats_filter houses all of the data that is filtered through */}
      </div>
    </div>
  );
};

export default Parent_Check_Stats;
