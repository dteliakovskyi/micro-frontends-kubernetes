import nats, { Stan } from "node-nats-streaming";

class NatsMQ {
  private _stan?: Stan;

  get stan() {
    if (!this._stan) {
      throw new Error("Cannot access NATS client before connecting");
    }

    return this._stan;
  }

  connect(clusterId: string, clientId: string, url: string): Promise<void> {
    this._stan = nats.connect(clusterId, clientId, { url });

    this._stan.on("close", () => {
      console.log("NATS streaming service was closed!");
    });

    return new Promise((resolve, reject) => {
      this.stan.on("connect", () => {
        resolve();
      });
      this.stan.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsMQ = new NatsMQ();
