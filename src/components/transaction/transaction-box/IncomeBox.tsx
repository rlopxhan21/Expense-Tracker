import React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

interface Props {
  totalIncome: number;
  incomeChange: number;
}

export const IncomeBox: React.FC<Props> = ({ totalIncome, incomeChange }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        gap: 4,
        p: 4,
        width: 400,
        borderRadius: 5,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" fontWeight={700} color="text.secondary">
        Income Information
      </Typography>
      <Typography variant="h3" fontWeight={700} color="text.secondary">
        $ {totalIncome}
      </Typography>
      <Chip
        icon={
          incomeChange > 0 ? (
            <KeyboardDoubleArrowUpIcon />
          ) : (
            <KeyboardDoubleArrowDownIcon />
          )
        }
        label={`${incomeChange > 0 ? "Up" : "Down"} by ${Math.abs(
          +incomeChange.toFixed(2)
        )} % than last month`}
        variant="filled"
        color="success"
        sx={{ py: 3, fontWeight: 700, fontSize: 18 }}
      />
    </Paper>
  );
};
