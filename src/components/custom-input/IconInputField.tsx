import React from "react";
import { useController, useFormContext } from "react-hook-form";

import TextField, { TextFieldProps } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

interface Props extends Omit<TextFieldProps, "name" | "label" | "type"> {
  id: string;
  name: string;
  label: string;
  type: string;
  startIcon: JSX.Element;
  endIcon: JSX.Element;
  endIconSwap: JSX.Element;
}

export const IconInputField: React.FC<Props> = ({
  id,
  name,
  label,
  type,
  startIcon,
  endIcon,
  endIconSwap,
  ...rest
}) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const { control, formState } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  let inputType = type;

  if (inputType === "password") {
    if (showPassword) {
      inputType = "text";
    } else {
      inputType = type;
    }
  }

  return (
    <FormControl>
      <TextField
        id={id}
        label={label}
        type={inputType}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{startIcon}</InputAdornment>
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
              {showPassword ? endIconSwap : endIcon}
            </InputAdornment>
          ),
        }}
        {...field}
        {...rest}
        error={!!formState.errors[name]}
        helperText={fieldState.error?.message}
      />
    </FormControl>
  );
};
