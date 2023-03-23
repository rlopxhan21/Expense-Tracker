import React from "react";
import { PieChart } from "react-minimal-pie-chart";

import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/redux";

export const TransactionChart = () => {
  const data = useSelector((state: RootState) => state.trans.transactions);
  return (
    <Box sx={{ height: 400, width: 400, flexGrow: 1 }}>
      <PieChart
        data={[
          { title: "Expense", value: 20, color: "#ffa8a8" },
          { title: "Income", value: 80, color: "#8ce99a" },
        ]}
      />
    </Box>
  );
};
