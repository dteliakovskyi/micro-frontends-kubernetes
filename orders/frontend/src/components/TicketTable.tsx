import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { FC } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Ticket } from "../types";
import { getUserEmail } from "../utils";

type TicketTableProps = Ticket & {
  orderId: string;
  isExpired: boolean;
};

export const TicketTable: FC<TicketTableProps> = ({
  orderId,
  title,
  price,
  isExpired,
}) => {
  const userEmail = getUserEmail();

  const buyTicket = async (token: string) => {
    await axios.post("/api/payments", { token, orderId });

    location.reload();
  };

  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h6" gutterBottom component="div">
        Ticket Details
      </Typography>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Price (PLN)</TableCell>
            {!isExpired ? <TableCell align="center"></TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              {title}
            </TableCell>
            <TableCell align="right">{price}</TableCell>
            {!isExpired ? (
              <TableCell align="center">
                <StripeCheckout
                  stripeKey="pk_test_51M71o0HYTFoSlhg1wYsRc8pr3pkaWosK5Bhy6ZexJtZdsr4cVaNZomRIVEul5SXjL7oxkwXGDAIWjY4r21VBEXcC00aHCGxVuM"
                  amount={price * 100}
                  email={userEmail || undefined}
                  token={(token) => buyTicket(token.id)}
                />
              </TableCell>
            ) : null}
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};
