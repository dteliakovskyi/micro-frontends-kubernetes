import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { FC, FocusEvent, FormEvent, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const UpdateTicket: FC = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { push } = useHistory();
  const { ticketId } = useParams<{ ticketId: string }>();
  const [isError, setIsError] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { data } = await axios.put(`/api/tickets/${ticketId}`, {
      title,
      price,
    });

    if (data.errors) {
      return setIsError(true);
    }

    push("/");
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value);

    if (isNaN(inputValue)) {
      return setPrice("");
    }

    setPrice(inputValue.toFixed(2));
  };

  return (
    <Container maxWidth={"xs"}>
      <Typography variant="h3" align="center" padding={4}>
        Edit the Ticket
      </Typography>
      <Card sx={{ borderRadius: 2, p: 2, boxShadow: 3 }}>
        <Box component={"form"} onSubmit={onSubmit} sx={{ mt: 6 }}>
          <Grid container spacing={2} justifyContent={"center"}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                value={price}
                onBlur={onBlur}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
              />
            </Grid>
            {isError && (
              <Alert severity="error">Unable to edit not your ticket</Alert>
            )}
            <Button type="submit" sx={{ mt: 3, mb: 2 }} color="secondary">
              Submit
            </Button>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
};

export default UpdateTicket;
