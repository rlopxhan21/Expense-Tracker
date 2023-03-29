import React from "react";
import { useTheme } from "../../../theme/useTheme";

import { TransactionForm } from "../transaction-form/TransactionForm";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import PaymentsIcon from "@mui/icons-material/Payments";
import { Stack, useMediaQuery } from "@mui/material";

interface Props {
  totalBalance: number;
}

export const BalanceBox: React.FC<Props> = ({ totalBalance }) => {
  const { theme } = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ width: { xs: "95%", md: "45%" } }}
      >
        <Typography variant="h5" fontWeight={700}>
          Balance / Saving Information
        </Typography>
        <Typography
          variant="h3"
          fontWeight={700}
          color={totalBalance >= 0 ? "text.secondary" : "error"}
        >
          {totalBalance >= 0 ? "+" : "-"} $ {Math.abs(totalBalance)}
        </Typography>
      </Stack>
      <Button
        variant="contained"
        size="large"
        startIcon={<PaymentsIcon />}
        disableElevation
        sx={{
          px: 8,
          borderRadius: 2.5,
          width: smallScreen ? "95%" : "45%",
        }}
      >
        <TransactionForm />
      </Button>
    </Paper>
  );
};
