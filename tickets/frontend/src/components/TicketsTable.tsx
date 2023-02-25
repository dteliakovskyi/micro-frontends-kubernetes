import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { FC, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { Ticket } from "../types";
import { getUserEmail } from "../utils";
import { Iconify } from "./Iconify";

type TicketsTableProps = {
  tickets: Ticket[];
  handleOpenEdit: (
    event: MouseEvent<HTMLButtonElement>,
    ticketId: string
  ) => void;
};

export const TicketsTable: FC<TicketsTableProps> = ({
  handleOpenEdit,
  tickets,
}) => {
  const userEmail = getUserEmail();
  const { push } = useHistory();

  const createOrder = async (ticketId: string) => {
    const { data } = await axios.post("/api/orders", { ticketId });

    if (data.order) {
      push(`/orders/${data.order.id}`);
    }
  };

  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell component="th">Title</TableCell>
            <TableCell component="th">Price</TableCell>
            <TableCell component="th" align="center">
              Action
            </TableCell>
            <TableCell component="th"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.length ? (
            tickets.map((ticket) => (
              <TableRow hover key={ticket.id}>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>{ticket.price}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => createOrder(ticket.id)}
                    disabled={!userEmail}
                  >
                    Create Order
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="large"
                    color="inherit"
                    onClick={(e) => handleOpenEdit(e, ticket.id)}
                  >
                    <Iconify icon={"eva:more-vertical-fill"} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                <Typography variant="body2" align="center">
                  There are no tickets
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
