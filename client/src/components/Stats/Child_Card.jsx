import React, { useState, useEffect } from "react";
import {Card, CardContent, Typography} from "@mui/material";

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

  const groupedResults = {};
  results.forEach((result) => {
    if (!groupedResults[result.userId]) {
      groupedResults[result.userId] = [];
    }
    console.log(groupedResults)
    groupedResults[result.userId].push(result);
  });

//   result.forEach((obj) => {
//     if (obj.day === true) {
//       console.log(obj.day);
//       totalDayHours += parseFloat(obj.hours);
//     }
//   });

//   result.forEach((obj) => {
//     if (obj.day === false) {
//       console.log(obj.day);
//       totalNightHours += parseFloat(obj.hours);
//     }
//   });

  return (
    <div>
      {Object.values(groupedResults).map((group) => {
        const { userId, FirstName } = group[0]; // Assuming userId and firstName are available in the group

        const totalHours = group.reduce((acc, cur) => acc + cur.hours, 0);
        const totalDayHours = group.reduce((acc, cur) => acc + cur.dayHours, 0);
        const totalNightHours = group.reduce((acc, cur) => acc + cur.nightHours, 0);

        return (
          <Card key={userId} style={{ width: "40em", margin: "1em" }}>
            <CardContent>
              <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
                {FirstName}
              </Typography>
              <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
                Total Hours Drive: {totalHours}
              </Typography>
              <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
                Total Day Hours Driven: {totalDayHours}
              </Typography>
              <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
                Total Night Hours Driven: {totalNightHours}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
//   return (
//     <div>
//       {results.map((result, index) => {
//         console.log("Babaloo", result);
//         return (
//           <Card
//             key={result.id}
//             style={{ width: "40em", margin:"1em" }}
//           >
//             <CardContent>
//               <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
//                 {result.FirstName}
//               </Typography>
//               <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
//                 Total Hours Drive: {hours}
//               </Typography>
//               <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
//                 Total Day Hours Driven: {dayHours}
//               </Typography>
//               <Typography sx={{ fontSize: 26 }} color="#244855" gutterBottom>
//                 Total Night Hours Driven: {nightHours}
//               </Typography>
//             </CardContent>
//           </Card>
//         );
//       })}
//     </div>
//   );
// };

export default Child_Card;
