import { InputListDataType } from "../../components/custom-input/IconInputField";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const inputFields: InputListDataType[] = [
  {
    id: "email",
    label: "Email Address",
    type: "email",
    name: "email",
    startIcon: <AlternateEmailIcon />,
    endIcon: <></>,
    endIconSwap: <></>,
    autoFocus: true,
    required: true,
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    name: "password",
    startIcon: <PasswordIcon />,
    endIcon: <VisibilityIcon />,
    endIconSwap: <VisibilityOffIcon />,
    required: true,
    autoFocus: false,
  },
];
