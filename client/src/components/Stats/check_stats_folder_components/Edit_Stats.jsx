import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Edit_Stats = () => {
  const [hoursResults, setHoursResults] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [weatherResults, setWeatherResults] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    const editPost = async ({ results, setResults }) => {
      const { id } = useParams();

      try {
        const response = await fetch(`http://localhost:8081/stats/edit` + id, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("MyToken"),
            "Content-Type": "application/json",
          },
        });

        useParams();
        const json = await response.json();

        setResults(josn.userStats);
      } catch (err) {
        console.log(first);
      }
    };
  }, []);

  return (
    <div>
      {results.map((obj) => {})}
      <button></button>
    </div>
  );
};

export default Edit_Stats;
