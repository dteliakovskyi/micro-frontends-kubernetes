import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { OrdersTable } from "../components";
import { Order } from "../types";

const Orders: FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/orders");

      setOrders(data.orders);
    })();
  }, []);

  return (
    <Container maxWidth={"md"}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Orders
        </Typography>
      </Stack>
      <OrdersTable orders={orders} />
    </Container>
  );
};

export default Orders;
