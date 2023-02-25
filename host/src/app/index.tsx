import { FC, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { Loader } from "../components/Loader";
import ThemeProvider from "../theme";
import { getUserEmail } from "../utils";

const Auth = lazy(() => import("../modules/Auth"));
const Orders = lazy(() => import("../modules/Orders"));
const Tickets = lazy(() => import("../modules/Tickets"));

export const App: FC = () => {
  const userEmail = getUserEmail();

  if (!userEmail) {
    return (
      <Suspense fallback={<Loader />}>
        <Auth />
      </Suspense>
    );
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/orders" component={Orders} />
            <Route path="/" component={Tickets} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};
