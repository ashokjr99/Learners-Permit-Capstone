import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Child_Card = () => {
  const [results, setResults] = useState([]);
  const [hours, setHours] = useState(0);
  const [drives, setDrives] = useState(0);
  const [dayHours, setDayHours] = useState(0);
  const [nightHours, setNightHours] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/stats/child_stats",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("MyToken")}`,
            },
          }
        );
        const json = await response.json();
        console.log(json);
        setResults(json.userStats);
        setName(json.summaryData.firstName);
        setHours(json.summaryData.totalHours);
        setDayHours(json.summaryData.totalDayHours);
        setNightHours(json.summaryData.totalNightHours);
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, []);

  return (
    <div>
      {results.map((result) => {
        console.log("Babaloo", result);
        return (
          <Card
            key={result.id}
            style={{ width: "40em", margin:"1em" }}
          >
            <CardContent>
              <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
                {result.FirstName}
              </Typography>
              <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
                Total Hours Drive: {result.hours}
              </Typography>
              <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
                Total Day Hours Driven: {result.dayHours}
              </Typography>
              <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
                Total Night Hours Driven: {result.nightHours}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Child_Card;
