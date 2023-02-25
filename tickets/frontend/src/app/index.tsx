import { FC } from "react";
import { Route, Switch } from "react-router-dom";

import CreateTicket from "../pages/create-ticket";
import Tickets from "../pages/tickets";
import UpdateTicket from "../pages/update-ticket";
import ThemeProvider from "../theme";

export const App: FC = () => {
  return (
    <ThemeProvider>
      <Switch>
        <Route exact path="/" component={Tickets} />
        <Route path="/tickets/create-ticket" component={CreateTicket} />
        <Route path="/tickets/:ticketId" component={UpdateTicket} />
      </Switch>
    </ThemeProvider>
  );
};
