import React from "react";

import { Layout } from "../../components/layout/Layout";
import { TransactionForm } from "../../components/transaction/transaction-form/TransactionForm";
import { TransactionTable } from "../../components/transaction/transaction-table/TransactionTable";
import { BalanceBox } from "../../components/transaction/transaction-box/BalanceBox";
import { IncomeBox } from "../../components/transaction/transaction-box/IncomeBox";
import { ExpenseBox } from "../../components/transaction/transaction-box/ExpenseBox";
import { TransactionChart } from "../../components/transaction/transaction-box/TransactionChart";

import Stack from "@mui/material/Stack";

export const DashboardPage = () => {
  return (
    <Layout>
      <Stack
        alignItems="center"
        gap={4}
        width={{ xs: "95%", md: "90%" }}
        sx={{ m: "auto", mt: 4 }}
      >
        <Stack direction={"row"} gap={4}>
          <BalanceBox />
          <IncomeBox />
          <ExpenseBox />
          <TransactionForm />
        </Stack>
        <Stack direction={"row"} gap={6}>
          <TransactionTable />
          <TransactionChart />
        </Stack>
      </Stack>
    </Layout>
  );
};
