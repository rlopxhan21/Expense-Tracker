import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";

import { db } from "../../../firebase/firebase-config";
import { useGetTransaction } from "../transaction-form/useGetTransaction";
import { RootState } from "../../../redux/redux";

import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useTheme } from "../../../theme/useTheme";

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const TransactionTable = () => {
  const transactionData = useSelector(
    (state: RootState) => state.trans.transactions
  );

  const { fetchTransactionsData } = useGetTransaction();

  const onDeleteHandler = async (
    itemID: string,
    itemName: string,
    itemPrice: string
  ) => {
    try {
      await deleteDoc(doc(db, "transactions", itemID));
      fetchTransactionsData();

      toast.success(
        `The item with description of ${itemName} and price ${itemPrice} is deleted successfully!`
      );
    } catch (error) {
      toast.error("Something went wrong while deleting!");
    }
  };

  const { theme } = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <List
      sx={{
        width: { xs: "100vw", md: 1264 },
        bgcolor: "background.paper",
        borderRadius: { xs: 0, md: 5 },
        background: smallScreen ? "#d0bfff" : "#f3d9fa",
      }}
    >
      {transactionData.map((item) => (
        <Stack
          key={item.id}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <ListItem alignItems="flex-start">
            <Stack direction={"row"} gap={{ xs: 2, md: 6 }}>
              <Stack direction={"row"} gap={{ xs: 1, md: 2 }}>
                <ListItemText
                  primary={
                    <Typography
                      variant="button"
                      color={
                        item.expense_income === "income" ? "#2b8a3e" : "error"
                      }
                      sx={{ display: "block" }}
                    >
                      {month[new Date(item.date).getMonth()]}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="button"
                      color={
                        item.expense_income === "income" ? "#2b8a3e" : "error"
                      }
                      sx={{ ml: 0.5 }}
                    >
                      {new Date(item.date).getDate()}
                    </Typography>
                  }
                />
                <Typography
                  variant="button"
                  color={item.expense_income === "income" ? "#2b8a3e" : "error"}
                  m="auto"
                  fontWeight={700}
                >
                  {new Date(item.date).getFullYear()}
                </Typography>
              </Stack>

              <ListItemAvatar>
                <Avatar
                  alt="Bills/ Expense"
                  variant="square"
                  sx={{ background: smallScreen ? "#d0bfff" : "#f3d9fa" }}
                >
                  {item.expense_income === "expense" ? (
                    <ShoppingCartIcon color="error" />
                  ) : (
                    <PaymentsIcon color="success" />
                  )}
                </Avatar>
              </ListItemAvatar>
            </Stack>

            <ListItemText
              primary={
                <Typography
                  color={item.expense_income === "income" ? "#2b8a3e" : "error"}
                  fontWeight={700}
                >
                  {item.desc}
                </Typography>
              }
              secondary={
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color={item.expense_income === "income" ? "#2b8a3e" : "error"}
                >
                  You have{" "}
                  {item.expense_income === "income" ? "earned" : "paid"} A${" "}
                  {item.amount}
                </Typography>
              }
              color="error"
              sx={{ ml: "auto" }}
            />
          </ListItem>
          <IconButton
            onClick={() => onDeleteHandler(item.id, item.desc, item.amount)}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Stack>
      ))}
    </List>
  );
};
