import App from "./App.svelte";

export const mount = (element) =>
  new App({
    target: element,
  });

if (process.env.NODE_ENV === "development") {
  const container = document.getElementById("mf-auth");
  if (container) {
    mount(container);
  }
}
