import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../redux/redux";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

export const IncomeBox = () => {
  const transactionData = useSelector(
    (state: RootState) => state.trans.transactions
  );

  let income = 0;
  // const totalIncome = transactionData.map(item => )
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
        $ 42, 000
      </Typography>
      <Chip
        icon={
          true ? <KeyboardDoubleArrowUpIcon /> : <KeyboardDoubleArrowDownIcon />
        }
        label="Up by 100%"
        variant="filled"
        color="success"
        sx={{ py: 3, fontWeight: 700, fontSize: 20 }}
      />
    </Paper>
  );
};
