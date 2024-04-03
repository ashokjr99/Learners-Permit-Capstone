import React from "react";
import {
  Charts,
  SummaryHeader,
  StatsFilter,
} from "./check_stats_folder_components";

//? Houses the overall look of Checking Stats and Seeing Summaries

const Check_Stats = () => {
  return (
    <div>
      <h1>Summaries</h1>
      <p>See your drive history in totality</p>

      <StatsFilter />
      <SummaryHeader />
      <Charts />
    </div>
  );
};

export default Check_Stats;
