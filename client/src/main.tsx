import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { MotionConfig } from 'framer-motion';

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </I18nextProvider>
);
