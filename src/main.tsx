import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { TenantProvider } from "./contexts/TenantContext.tsx";
import "./index.css";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <TenantProvider>
      <App />
    </TenantProvider>
  </HelmetProvider>
);
