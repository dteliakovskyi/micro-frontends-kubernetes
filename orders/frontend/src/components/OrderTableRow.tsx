import { Chip, Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import { Order } from "../types";
import { calculateTime } from "../utils";
import { Iconify } from "./Iconify";
import { TicketTable } from "./TicketTable";

export const OrderTableRow: FC<Order> = ({ id, status, expiresAt, ticket }) => {
  const isCanceled = status === "canceled";
  const isCompleted = status === "completed";

  const [isOpen, setIsOpen] = useState(false);
  const [timeToLeft, setTimeToLeft] = useState(
    isCompleted ? 0 : calculateTime(expiresAt)
  );

  useEffect(() => {
    if (timeToLeft < 0 || !id) return;

    const timer = setInterval(() => {
      const time = calculateTime(expiresAt);

      setTimeToLeft(time);
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, timeToLeft]);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Iconify
              icon={isOpen ? "eva:chevron-up-fill" : "eva:chevron-down-fill"}
            />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {id}
        </TableCell>
        <TableCell align="center">
          {!isCompleted && timeToLeft
            ? timeToLeft
            : isCompleted
            ? ""
            : "Order expired"}
        </TableCell>
        <TableCell align="center">
          <Chip
            label={status}
            color={isCompleted ? "success" : isCanceled ? "error" : "primary"}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <TicketTable
              isExpired={isCompleted || !timeToLeft}
              orderId={id}
              {...ticket}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};
