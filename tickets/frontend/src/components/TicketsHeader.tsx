import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import { Iconify } from "./Iconify";

export const TicketsHeader: FC = () => {
  const { push } = useHistory();

  const handleCreateTicket = () => {
    push("/tickets/create-ticket");
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={5}
    >
      <Typography variant="h4" gutterBottom>
        Tickets
      </Typography>
      <Button
        onClick={handleCreateTicket}
        variant="contained"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Create ticket
      </Button>
    </Stack>
  );
};
