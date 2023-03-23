import React from "react";

import { useGetTransaction } from "../../components/transaction/transaction-form/useGetTransaction";
import { Layout } from "../../components/layout/Layout";
import { TransactionForm } from "../../components/transaction/transaction-form/TransactionForm";
import { TransactionTable } from "../../components/transaction/transaction-table/TransactionTable";
import { BalanceBox } from "../../components/transaction/transaction-box/BalanceBox";
import { IncomeBox } from "../../components/transaction/transaction-box/IncomeBox";
import { ExpenseBox } from "../../components/transaction/transaction-box/ExpenseBox";

import Stack from "@mui/material/Stack";

export const DashboardPage = () => {
  const { fetchTransactionsData } = useGetTransaction();

  React.useEffect(() => {
    fetchTransactionsData();
  }, []);

  return (
    <Layout>
      <Stack
        alignItems="center"
        gap={4}
        width={{ xs: "95%", md: "90%" }}
        sx={{ m: "auto", my: 4 }}
      >
        <Stack direction={"row"} gap={4}>
          <BalanceBox />
          <IncomeBox />
          <ExpenseBox />
          <TransactionForm />
        </Stack>
        <Stack direction={"row"} gap={4}>
          <TransactionTable />
          <Stack gap={2}>
            <IncomeBox />
            <ExpenseBox />
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  );
};
