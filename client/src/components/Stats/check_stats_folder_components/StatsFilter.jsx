import React from "react";
// import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
            {/* //! do a day or night too */}
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((obj, index) => {
            console.log(obj.to);
            return (
              <TableRow
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsList;
