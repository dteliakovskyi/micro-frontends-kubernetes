import { dependencies } from "./package.json";

const domain = "https://microfrontends.dev";

export const moduleFederation = {
  name: "host",
  remotes: {
    auth: `auth@${domain}/mf-auth/authRemoteEntry.js`,
    tickets: `tickets@${domain}/mf-tickets/ticketsRemoteEntry.js`,
    orders: `orders@${domain}/mf-orders/ordersRemoteEntry.js`,
  },
  shared: dependencies,
};
