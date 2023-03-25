import React from "react";
import { UseFormRegister } from "react-hook-form";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

export interface InputListDataType {
  id: string;
  label: string;
  type: string;
  name: string;
  startIcon: JSX.Element;
  endIcon: JSX.Element;
  endIconSwap: JSX.Element;
  autoFocus: boolean;
  required: boolean;
  defaultValue: string;
}

interface Props {
  item: InputListDataType;
  register: UseFormRegister<any>;
  errors: any;
}

export const IconInputField: React.FC<Props> = ({ item, register, errors }) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const name = item.name;
  let inputType = item.type;

  if (inputType === "password") {
    if (showPassword) {
      inputType = "text";
    } else {
      inputType = item.type;
    }
  }

  console.log(errors);

  return (
    <React.Fragment>
      <TextField
        id={item.id}
        label={item.label}
        type={inputType}
        defaultValue={item.defaultValue}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{item.startIcon}</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={() => setShowPassword((prevState) => !prevState)}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {showPassword ? item.endIconSwap : item.endIcon}
            </InputAdornment>
          ),
        }}
        autoFocus={item.autoFocus}
        {...register(name, { required: item.required })}
        fullWidth
      />
      {/* <Typography>{errorMessage}</Typography> */}
    </React.Fragment>
  );
};
