import React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

interface Props {
  totalExpense: number;
  expenseChange: number;
}

export const ExpenseBox: React.FC<Props> = ({
  totalExpense,
  expenseChange,
}) => {
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
      <Typography variant="h5" fontWeight={700} color="error">
        Expense Information
      </Typography>
      <Typography variant="h3" fontWeight={700} color="error">
        $ {totalExpense}
      </Typography>
      <Chip
        icon={
          expenseChange > 0 ? (
            <KeyboardDoubleArrowUpIcon />
          ) : (
            <KeyboardDoubleArrowDownIcon />
          )
        }
        label={`${expenseChange > 0 ? "Up" : "Down"} by ${Math.abs(
          +expenseChange.toFixed(2)
        )} % than last month`}
        variant="filled"
        color="error"
        sx={{ py: 3, fontWeight: 700, fontSize: 18 }}
      />
    </Paper>
  );
};
