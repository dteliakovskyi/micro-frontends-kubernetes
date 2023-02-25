import { Stan } from "node-nats-streaming";
import { Event } from "./event";

export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];

  protected stan: Stan;

  constructor(stan: Stan) {
    this.stan = stan;
  }

  publish(data: T["data"]): Promise<void> {
    return new Promise((resolve, rejected) => {
      this.stan.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          rejected(err);
        }

        console.log("Event published to subject", this.subject);
        resolve();
      });
    });
  }
}
