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
import { useTheme } from "../../../theme/useTheme";
import { useMediaQuery } from "@mui/material";

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
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { sendTransactionData, isLoading } = usePostTransaction();

  const onTransactionFormHandler: SubmitHandler<FormDataType> = (data) => {
    sendTransactionData({ ...data, expense_income: tabValue });
    reset({
      desc: "",
      amount: "",
      date: "",
      expense_income: new Date().toISOString().split("T")[0],
    });
  };

  const { theme } = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Paper
      elevation={smallScreen ? 0 : 10}
      sx={{
        p: 4,
        width: { xs: "100vw", md: 400 },
        borderRadius: { xs: 0, md: 5 },
        background: tabValue === "income" ? "#b2f2bb" : "#ffc9c9",
      }}
    >
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
                color: "green",
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
          <IconInputField
            key={item.id}
            item={item}
            register={register}
            errors={errors}
          />
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
