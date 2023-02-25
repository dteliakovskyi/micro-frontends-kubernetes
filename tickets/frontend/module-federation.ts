import { dependencies } from "./package.json";

export const moduleFederation = {
  name: "tickets",
  filename: "ticketsRemoteEntry.js",
  exposes: {
    "./Module": "./src/bootstrap",
  },
  shared: dependencies,
};
