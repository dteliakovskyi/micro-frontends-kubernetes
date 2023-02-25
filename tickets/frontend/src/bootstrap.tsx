import { createBrowserHistory, createMemoryHistory } from "history";
import { createRoot } from "react-dom/client";
import { Router } from "react-router-dom";
import { App } from "./app";

type MountConfig = {
  initialPath: string;
  isBrowserHistory?: boolean;
};

export const mount = (
  element: HTMLElement,
  { initialPath, isBrowserHistory = false }: MountConfig
) => {
  const root = createRoot(element);
  const history = isBrowserHistory
    ? createBrowserHistory()
    : createMemoryHistory({ initialEntries: [initialPath] });
  const ticketsRouteChannel = new BroadcastChannel("ticketsRouteChannel");

  ticketsRouteChannel.onmessage = (event: MessageEvent) => {
    const { pathname } = history.location;

    if (pathname !== event.data) {
      history.push(event.data);
    }
  };

  history.listen(({ pathname }) => ticketsRouteChannel.postMessage(pathname));

  root.render(
    <Router history={history}>
      <App />
    </Router>
  );
};

if (process.env.NODE_ENV === "development") {
  const container = document.getElementById("mf-tickets");

  if (container) {
    mount(container, { initialPath: "/", isBrowserHistory: true });
  }
}
