import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Child_Card = () => {
  const [results, setResults] = useState([]);
  const [hours, setHours] = useState(0);
  const [drives, setDrives] = useState(0);
  const [dayHours, setDayHours] = useState(0);
  const [nightHours, setNightHours] = useState(0);

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/stats/child_stats`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("MyToken")}`,
            },
          }
        );
        const json = await response.json();
        console.log(json);
        setResults(json.userStats);
        setHours(json.summaryData.totalHours);
        setDrives(json.summaryData.totalDrives);
        setDayHours(json.summaryData.totalDayHours);
        setNightHours(json.summaryData.totalNightHours);
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  });


  return (
    <div>
      <Card variant="outlined"></Card>
    </div>
  );
};

export default Child_Card;
