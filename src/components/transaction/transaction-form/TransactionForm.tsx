import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IconInputField } from "../../custom-input/IconInputField";
import { inputFields } from "./TransactionInputList";
import { schema } from "./TransactionZod";
import { usePostTransaction } from "./usePostTransaction";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { LoadingButton } from "@mui/lab";

import AddIcon from "@mui/icons-material/Add";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export interface FormDataType {
  [name: string]: string;
}

export const TransactionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { sendTransactionData, isLoading } = usePostTransaction();

  const onTransactionFormHandler: SubmitHandler<FormDataType> = (data) => {
    sendTransactionData(data);
  };

  return (
    <Paper elevation={0} sx={{ p: 4, width: 400, borderRadius: 5 }}>
      <Stack
        gap={2}
        component="form"
        noValidate
        onSubmit={handleSubmit(onTransactionFormHandler)}
      >
        <FormControl component="fieldset">
          <RadioGroup>
            <FormControlLabel
              value="income"
              control={<Radio />}
              label="Income"
              {...register("expense_income", { required: true })}
            />
            <FormControlLabel
              value="expense"
              control={<Radio />}
              label="Expense"
              {...register("expense_income", { required: true })}
            />
          </RadioGroup>
        </FormControl>
        {inputFields.map((item) => (
          <IconInputField key={item.id} item={item} register={register} />
        ))}
        <LoadingButton
          variant="contained"
          type="submit"
          startIcon={<AddIcon />}
          color={"success"}
          loading={isLoading}
          loadingIndicator="Adding..."
        >
          Add
        </LoadingButton>
      </Stack>
    </Paper>
  );
};
