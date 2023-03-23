import { useSelector } from "react-redux";

import { RootState } from "../../../redux/redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";

import { Delete } from "@mui/icons-material";

export const TransactionTable = () => {
  const transactionData = useSelector(
    (state: RootState) => state.trans.transactions
  );

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
          {transactionData.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.desc}
              </TableCell>
              <TableCell align="right">$ {item.amount}</TableCell>
              <TableCell align="right">
                {new Date(item.date).toDateString()}
              </TableCell>
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
