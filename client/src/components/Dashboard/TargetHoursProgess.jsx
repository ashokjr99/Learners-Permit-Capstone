import { useScrollTrigger } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";

const TargetHoursProgess = () => {
  const [currentHours, setCurrentHours] = useState(0);
  const [targetHours, setTargetHours] = useState(0);

  const textColor = "black";

  useEffect(() => {
    const getTargetHours = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/stats/child_target_hours`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("MyToken")}`,
            },
          }
        );

        const json = await response.json();

        setCurrentHours(json.summaryData.totalHours);
        setTargetHours(parseFloat(json.targetHours));
        console.log(currentHours, "current hours");
        console.log(typeof targetHours, "target hours");
      } catch (err) {
        console.log(err);
      }
    };
    getTargetHours();
  }, [targetHours, currentHours]);

  return (
    <div>
      {targetHours != 0 ? (
        <ReactSpeedometer
          value={currentHours}
          needleHeightRatio={0.5}
          labelFontSize={"15px"}
          valueTextFontSize={"23px"}
          textColor={textColor}
          maxValue={targetHours === 0 ? 100 : targetHours}
          minValue={0}
        />
      ) : null}
    </div>
  );
};

export default TargetHoursProgess;
