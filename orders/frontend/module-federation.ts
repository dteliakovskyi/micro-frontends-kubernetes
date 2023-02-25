import { dependencies } from "./package.json";

export const moduleFederation = {
  name: "orders",
  filename: "ordersRemoteEntry.js",
  exposes: {
    "./Module": "./src/bootstrap",
  },
  shared: dependencies,
};
