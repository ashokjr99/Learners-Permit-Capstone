import React from "react";
// import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Edit_Stats from "./Edit_Stats";
import Delete_Stats from "./Delete_Stats";

const StatsList = ({ results }) => {
  // prop results passed from check_stats
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hours</TableCell>
            <TableCell align="center">Date Posted</TableCell>
            <TableCell align="center">Vehicle</TableCell>
            <TableCell align="center">Weather</TableCell>
            <TableCell align="center">From</TableCell>
            <TableCell align="center">To</TableCell>
            <TableCell align="center">Day/Night</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((obj, index) => {
            console.log(obj.to);
            console.log(obj.day);
            return (
              <TableRow
                style={{ backgroundColor: index % 2 == 0 ? "red" : "blue" }}
                // if row is even, color background red, if odd, color background blue
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
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
                <TableCell align="center">Edit</TableCell>
                //! pass props to return edit button from edit_stats
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsList;
