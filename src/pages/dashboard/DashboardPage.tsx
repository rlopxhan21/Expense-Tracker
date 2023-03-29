import React from "react";

import { Layout } from "../../components/layout/Layout";
import { TransactionTable } from "../../components/transaction/transaction-table/Transaction-Table";
import { BalanceBox } from "../../components/transaction/transaction-box/BalanceBox";
import { IncomeBox } from "../../components/transaction/transaction-box/IncomeBox";
import { ExpenseBox } from "../../components/transaction/transaction-box/ExpenseBox";
import { useDashBoardCalcInformation } from "./useDashBoardCalcInformation";

import Stack from "@mui/material/Stack";

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
        <BalanceBox totalBalance={totalBalance} />
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={2}
          sx={{ width: "100%" }}
        >
          <IncomeBox totalIncome={totalIncome} incomeChange={incomeChange} />
          <ExpenseBox
            totalExpense={totalExpense}
            expenseChange={expenseChange}
          />
        </Stack>
        <TransactionTable />
      </Stack>
    </Layout>
  );
};
