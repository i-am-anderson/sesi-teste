import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./routes/Router";
import "./styles/global.scss";
import { VLibras, Accessibility } from "./components";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Router />
        <VLibras />
        <Accessibility />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
