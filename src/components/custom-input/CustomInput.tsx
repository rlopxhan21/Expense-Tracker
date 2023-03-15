import React, { ChangeEventHandler } from "react";

import { TextField } from "@mui/material";

export interface InputFieldsDataType {
  label: string;
  id: string;
  type: string;
  name: string;
  autoComplete: string;
  autoFocus: boolean;
  fullWidth: boolean;
  required: boolean;
}

interface Props {
  item: InputFieldsDataType;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

export const CustomInput: React.FC<Props> = ({ item, handleChange }) => {
  return (
    <TextField
      margin="normal"
      label={item.label}
      id={item.id}
      type={item.type}
      name={item.name}
      autoComplete={item.autoComplete}
      fullWidth={item.fullWidth}
      autoFocus={item.autoFocus}
      required={item.required}
      onChange={handleChange}
    />
  );
};
