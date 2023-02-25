import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { OrderTableRow } from "../components";
import { Order } from "../types";

export const OrdersTable: FC<{ orders: Order[] }> = ({ orders }) => {
  return (
    <TableContainer
      component={Card}
      sx={{ borderRadius: 2, p: 2, boxShadow: 3 }}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>OrderId</TableCell>
            <TableCell align="center">Expired at</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length ? (
            orders.map((order) => <OrderTableRow key={order.id} {...order} />)
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                <Typography variant="body2" align="center">
                  There are no orders
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
