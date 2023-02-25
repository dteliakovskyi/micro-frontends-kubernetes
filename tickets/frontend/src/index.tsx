import { FC, useState } from "react";

import("./bootstrap");

const ExampleComponent: FC = () => {
  const [state, setState] = useState("someValue");
  const changeState = () => {
    setState("anotherValue");
  };
  return (
    <section>
      <h1>JSX</h1>
      <p>{state}</p>
      <button onClick={changeState}>Change state</button>
    </section>
  );
};
