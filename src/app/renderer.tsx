import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";

const App = () => {
  return <>Hello World</>;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
