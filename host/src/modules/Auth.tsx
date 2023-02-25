import { mount } from "auth/Module";
import { useEffect, useRef } from "react";

const Auth = () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};

export default Auth;
