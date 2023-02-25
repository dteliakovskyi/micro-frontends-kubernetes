import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { mount } from "tickets/Module";
import { Layout } from "../layout";

const Tickets = () => {
  const ref = useRef(null);
  const history = useHistory();
  const ticketsRouteChannel = new BroadcastChannel("ticketsRouteChannel");

  ticketsRouteChannel.onmessage = (event: MessageEvent) => {
    const { pathname } = history.location;

    if (event.data !== pathname) {
      history.push(event.data);
    }
  };

  useEffect(() => {
    mount(ref.current, { initialPath: history.location.pathname });

    history.listen(({ pathname }) => ticketsRouteChannel.postMessage(pathname));
  }, []);

  return (
    <Layout>
      <div ref={ref} />
    </Layout>
  );
};

export default Tickets;
