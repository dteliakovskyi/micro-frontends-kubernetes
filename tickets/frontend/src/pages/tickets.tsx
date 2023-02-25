import {
  Card,
  Container,
  MenuItem,
  Popover,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Iconify,
  TicketsHeader,
  TicketsSearch,
  TicketsTable,
} from "../components";
import { Ticket } from "../types";

const Tickets: FC = () => {
  const history = useHistory();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpenEdit, setIsOpenEdit] = useState<Element | null>(null);
  const [ticketId, setTicketId] = useState<string>();

  const handleOpenEdit = (
    event: MouseEvent<HTMLButtonElement>,
    ticketId: string
  ) => {
    setIsOpenEdit(event.currentTarget);
    setTicketId(ticketId);
  };

  const handleCloseEdit = () => {
    setIsOpenEdit(null);
  };

  const handleFilterByName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setPage(0);
    setFilterName(value);
    setFilteredTickets(
      tickets.filter((ticket) =>
        ticket.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/tickets");

      setTickets(data.tickets);
      setFilteredTickets(data.tickets);
    })();
  }, []);

  return (
    <Container maxWidth={"md"}>
      <TicketsHeader />
      <Card sx={{ borderRadius: 2, p: 2, boxShadow: 3 }}>
        <TicketsSearch
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <TicketsTable
          tickets={filteredTickets}
          handleOpenEdit={handleOpenEdit}
        />
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredTickets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <Popover
        anchorEl={isOpenEdit}
        open={Boolean(isOpenEdit)}
        onClose={handleCloseEdit}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => ticketId && history.push(`/tickets/${ticketId}`)}
        >
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
      </Popover>
    </Container>
  );
};

export default Tickets;
