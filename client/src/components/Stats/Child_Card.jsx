import React, { useState, useEffect } from "react";

import { Card, CardContent, Typography } from "@mui/material";

const Child_Card = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/stats/child_card_stats",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("MyToken")}`,
            },
          }
        );
        const json = await response.json();

        console.log("jsonn", json);

        setResults(json.newUserStats);
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, []);

  return (
    <div
      className="roboto-regular"
      style={{ display: "flex", flexDirection: "row" }}
    >
      {results.map((obj) => {
        return (
          <Card
            key={obj.id}
            style={{
              width: "40em",
              margin: "1em",
              boxShadow: "4px 4px 4px #000000",
              borderRadius: "1em",
              backgroundColor: "#90AEAD",
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  fontSize: 32,
                  textDecoration: "underline 2px",
                  fontWeight: "700",
                }}
                color="#244855"
                gutterBottom
              >
                {obj.FirstName}
              </Typography>
              <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
                Total Hours Driven: {obj.totalHours} hours
              </Typography>
              <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
                Total Day Hours Driven: {obj.totalDayHours} hours
              </Typography>
              <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
                Total Night Hours Driven: {obj.totalNightHours} hours
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Child_Card;
