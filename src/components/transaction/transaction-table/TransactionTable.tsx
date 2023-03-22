import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/redux";

function createData(
  expense: string,
  amount: string,
  date: string,
  uid: string
) {
  return { expense, amount, date, uid };
}

const rows = [
  createData("Frozen yoghurt", "159", "6.0", "24"),
  createData("Ice cream sandwich", "237", "9.0", "37"),
];

export const TransactionTable = () => {
  const transactionData = useSelector(
    (state: RootState) => state.trans.transactions
  );

  console.log(transactionData);
  return (
    <TableContainer component={Paper} sx={{ width: 1256 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Expense Type</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.expense}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.expense}
              </TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <Delete color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
