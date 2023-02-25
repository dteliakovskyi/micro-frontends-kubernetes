import { FC, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import ThemeProvider from "../theme";

const Orders = lazy(() => import("../pages/orders"));

export const App: FC = () => {
  return (
    <ThemeProvider>
      <Switch>
        <Route path="/orders" component={Orders} />
      </Switch>
    </ThemeProvider>
  );
};
