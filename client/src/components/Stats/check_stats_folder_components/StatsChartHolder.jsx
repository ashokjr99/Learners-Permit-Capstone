import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Edit_Stats from "./Edit_Stats";
import Delete_Stats from "./Delete_Stats";

const StatsList = ({ results, setReFetch }) => {
  // prop results passed from check_stats

  const [showEdit, setShowEdit] = useState(false);
  const [statsObj, setStatsObj] = useState({});
  const userType = localStorage.getItem("User Type");

  return (
    <div style={{ position: "relative" }}>
      {showEdit ? (
        <Edit_Stats
          stats={statsObj}
          setShowEdit={setShowEdit}
          showEdit={showEdit}
          setReFetch={setReFetch}
        />
      ) : null}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {userType === "parent" && (
                <TableCell align="center">Child</TableCell>
              )}
              <TableCell>Hours</TableCell>
              <TableCell align="center">Date Posted</TableCell>
              <TableCell align="center">Vehicle</TableCell>
              <TableCell align="center">Weather</TableCell>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
              <TableCell align="center">Day/Night</TableCell>
              <TableCell align="center">Practiced</TableCell>
              <TableCell align="center">Notes</TableCell>
              {userType === "parent" && (
                <TableCell align="center">Approved</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {results

              .filter((obj) => obj.parent_approval === true)
              .map((obj, index) => {
                return (
                  <TableRow
                    key={obj.id}
                    style={{
                      backgroundColor: index % 2 == 0 ? "#84CEEB" : "#C1C8E4",
                    }}
                    // if row is even, color background red, if odd, color background blue

                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {userType === "parent" && (
                      <TableCell align="center">{obj.FirstName}</TableCell>
                    )}
                    <TableCell component="th" scope="row">
                      {obj.hours}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(obj.timestamp).toDateString()}
                    </TableCell>
                    <TableCell align="center">{obj.vehicle_type}</TableCell>
                    <TableCell align="center">{obj.weather}</TableCell>
                    <TableCell align="center">{obj.from}</TableCell>
                    <TableCell align="center">{obj.to}</TableCell>
                    <TableCell align="center">
                      {obj.day === false ? "Night" : "Day"}
                    </TableCell>
                    <TableCell align="center">{obj.practiced}</TableCell>
                    <TableCell align="center">{obj.notes}</TableCell>
                    {userType === "parent" && (
                      <TableCell align="center">
                        {obj.parent_approval === false
                          ? "Awaiting"
                          : "Approved"}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StatsList;
