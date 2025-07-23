import { store } from "@/store";
import { ConfigProvider, type ThemeConfig } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";

const THEME: ThemeConfig = {
  components: {
    Typography: {
      titleMarginBottom: 0,
    },
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={THEME}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </StrictMode>
);
