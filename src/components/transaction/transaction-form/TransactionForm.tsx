import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IconInputField } from "../../custom-input/IconInputField";
import { inputFields } from "./TransactionInputList";
import { schema } from "./TransactionZod";
import { usePostTransaction } from "./usePostTransaction";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import LoadingButton from "@mui/lab/LoadingButton";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

import AddIcon from "@mui/icons-material/Add";

export interface FormDataType {
  [name: string]: string;
}

export const TransactionForm = () => {
  const [tabValue, setTabValue] = React.useState("income");

  const onTabChangeHandler = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setTabValue(newValue);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { sendTransactionData, isLoading } = usePostTransaction();

  const onTransactionFormHandler: SubmitHandler<FormDataType> = (data) => {
    sendTransactionData({ ...data, expense_income: tabValue });
  };

  return (
    <Paper elevation={0} sx={{ p: 4, width: 400, borderRadius: 5 }}>
      <Stack
        gap={2}
        component="form"
        noValidate
        onSubmit={handleSubmit(onTransactionFormHandler)}
      >
        <TabContext value={tabValue}>
          <TabList
            onChange={onTabChangeHandler}
            variant="fullWidth"
            aria-label="Movie Tab"
            color="secondary"
          >
            <Tab
              label="Income"
              value="income"
              sx={{
                "&:checked": { color: "red", background: "red" },
                fontWeight: 700,
              }}
            />
            <Tab
              label="Expense"
              value="expense"
              sx={{ color: "red", fontWeight: 700 }}
            />
          </TabList>
        </TabContext>

        {inputFields.map((item) => (
          <IconInputField key={item.id} item={item} register={register} />
        ))}
        <LoadingButton
          variant="contained"
          type="submit"
          startIcon={<AddIcon />}
          color={tabValue === "income" ? "success" : "error"}
          loading={isLoading}
          loadingIndicator="Adding..."
        >
          Add {tabValue === "income" ? "Income" : "Expense"}
        </LoadingButton>
      </Stack>
    </Paper>
  );
};
