export type Ticket = {
  id: string;
  title: string;
  price: number;
};

export type Order = {
  id: string;
  status: string;
  expiresAt: string;
  ticket: Ticket;
};
