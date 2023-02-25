import { InternalError, natsMQ } from "@joise/common";
import { OrderCompletedListener, OrderCreatedListener } from "./listeners";

void (async () => {
  if (!process.env.NATS_URL) {
    throw new InternalError("NATS_URL must be defined");
  } else if (!process.env.NATS_CLUSTER_ID) {
    throw new InternalError("NATS_CLUSTER_ID must be defined");
  } else if (!process.env.NATS_CLIENT_ID) {
    throw new InternalError("NATS_CLIENT_ID must be defined");
  }

  try {
    await natsMQ.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    console.log("Connected to NATS");

    new OrderCreatedListener(natsMQ.stan).listen();
    new OrderCompletedListener(natsMQ.stan).listen();
  } catch (err) {
    throw new InternalError("Error connecting to NATS Streaming Server");
  }
})();
