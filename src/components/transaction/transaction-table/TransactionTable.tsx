import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";

import { db } from "../../../firebase/firebase-config";
import { useGetTransaction } from "../transaction-form/useGetTransaction";
import { RootState } from "../../../redux/redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Typography } from "@mui/material";

import { Delete } from "@mui/icons-material";

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

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ width: 1264, borderRadius: 5 }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Income/ Expense Description</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionData.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                <Typography
                  variant="body1"
                  fontWeight={500}
                  color={
                    item.expense_income === "expense" ? "error" : "#2b8a3e"
                  }
                >
                  {item.desc}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight={500}
                  color={
                    item.expense_income === "expense" ? "error" : "#2b8a3e"
                  }
                >
                  {item.expense_income === "expense" ? "-" : "+"} ${" "}
                  {item.amount}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight={500}
                  color={
                    item.expense_income === "expense" ? "error" : "#2b8a3e"
                  }
                >
                  {new Date(item.date).toDateString()}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <IconButton
                  onClick={() =>
                    onDeleteHandler(item.id, item.desc, item.amount)
                  }
                >
                  <Delete
                    color={
                      item.expense_income === "expense" ? "error" : "success"
                    }
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
