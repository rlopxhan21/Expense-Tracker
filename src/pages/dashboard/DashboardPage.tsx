import React from "react";

import { Layout } from "../../components/layout/Layout";
import { TransactionForm } from "../../components/transaction/transaction-form/TransactionForm";
import { TransactionTable } from "../../components/transaction/transaction-table/Transaction-Table";
import { BalanceBox } from "../../components/transaction/transaction-box/BalanceBox";
import { IncomeBox } from "../../components/transaction/transaction-box/IncomeBox";
import { ExpenseBox } from "../../components/transaction/transaction-box/ExpenseBox";
import { useDashBoardCalcInformation } from "./useDashBoardCalcInformation";

import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

export const DashboardPage = () => {
  const {
    totalBalance,
    totalIncome,
    incomeChange,
    totalExpense,
    expenseChange,
  } = useDashBoardCalcInformation();

  return (
    <Layout>
      <Stack
        alignItems="center"
        gap={4}
        width={{ xs: "100vw", md: "90%" }}
        sx={{ m: "auto", my: 4 }}
      >
        <Stack direction={{ xs: "column", md: "row" }} gap={{ xs: 1, md: 4 }}>
          <BalanceBox totalBalance={totalBalance} />
          <IncomeBox totalIncome={totalIncome} incomeChange={incomeChange} />
          <ExpenseBox
            totalExpense={totalExpense}
            expenseChange={expenseChange}
          />
          <TransactionForm />
        </Stack>
        <Stack direction={{ xs: "column", md: "row" }} gap={4}>
          <TransactionTable />
          <Box sx={{ width: 400 }}></Box>
        </Stack>
      </Stack>
    </Layout>
  );
};
