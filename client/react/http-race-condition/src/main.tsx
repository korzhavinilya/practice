import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RaceConditionDemo from "./RaceConditionDemo.tsx";
import RaceConditionFlag from "./fixes/RaceConditionFlag.tsx";
import RaceConditionAbortController from "./fixes/RaceConditionAbortController.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RaceConditionDemo />
    <RaceConditionFlag />
    <RaceConditionAbortController />
  </StrictMode>,
);
