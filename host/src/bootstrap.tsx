import { createRoot } from "react-dom/client";
import { App } from "./app";

const container = document.getElementById("host");
const root = createRoot(container!);

root.render(<App />);
