import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { mount } from "orders/Module";
import { Layout } from "../layout";

const Orders = () => {
  const ref = useRef(null);
  const history = useHistory();
  const ordersRouteChannel = new BroadcastChannel("ordersRouteChannel");

  ordersRouteChannel.onmessage = (event: MessageEvent) => {
    const { pathname } = history.location;

    if (event.data !== pathname) {
      history.push(event.data);
    }
  };

  useEffect(() => {
    mount(ref.current, { initialPath: history.location.pathname });

    history.listen(({ pathname }) => ordersRouteChannel.postMessage(pathname));
  }, []);

  return (
    <Layout>
      <div ref={ref} />
    </Layout>
  );
};

export default Orders;
