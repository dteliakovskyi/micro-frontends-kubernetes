import { ExpirationCompletePublisher, natsMQ } from "@joise/common";
import Queue from "bull";
import { QueueNames } from "../config";

type Payload = {
  orderId: string;
};

const expirationQueue = new Queue<Payload>(QueueNames.ORDER_EXPIRATION, {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job, done) => {
  new ExpirationCompletePublisher(natsMQ.stan).publish({
    orderId: job.data.orderId,
  });

  done();
});

export { expirationQueue };
