import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { MotionConfig } from 'framer-motion';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { LanguageProvider } from "./components/LanguageContext";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </LanguageProvider>
    </I18nextProvider>
  </QueryClientProvider>
);
