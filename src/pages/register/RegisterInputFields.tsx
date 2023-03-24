import { InputListDataType } from "../../components/custom-input/IconInputField";

import BadgeIcon from "@mui/icons-material/Badge";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const inputFields: InputListDataType[] = [
  {
    label: "First Name",
    id: "fname",
    type: "text",
    name: "fname",
    startIcon: <BadgeIcon />,
    endIcon: <></>,
    endIconSwap: <></>,
    autoFocus: true,
    required: true,
    defaultValue: "",
  },
  {
    label: "Last Name",
    id: "lname",
    type: "text",
    name: "lname",
    startIcon: <BadgeIcon />,
    endIcon: <></>,
    endIconSwap: <></>,
    required: true,
    autoFocus: false,
    defaultValue: "",
  },
  {
    label: "Email Address",
    id: "email",
    type: "email",
    name: "email",
    startIcon: <AlternateEmailIcon />,
    endIcon: <></>,
    endIconSwap: <></>,
    required: true,
    autoFocus: false,
    defaultValue: "",
  },
  {
    label: "Password",
    id: "password",
    type: "password",
    name: "password",
    startIcon: <PasswordIcon />,
    endIcon: <VisibilityIcon />,
    endIconSwap: <VisibilityOffIcon />,
    required: true,
    autoFocus: false,
    defaultValue: "",
  },
  {
    label: "Confirm Password",
    id: "password2",
    type: "password",
    name: "password2",
    startIcon: <PasswordIcon />,
    endIcon: <VisibilityIcon />,
    endIconSwap: <VisibilityOffIcon />,
    required: true,
    autoFocus: false,
    defaultValue: "",
  },
];
