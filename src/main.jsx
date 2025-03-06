import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.jsx";
import { Provider } from "react-redux";
import store from "@/app/store";
import { AppProvider } from "./context/AppProvider";
import { Toaster } from "react-hot-toast";
import { useTheme } from "@/context/ThemeContext";

const ThemeToaster = () => {
  const { isDarkMode } = useTheme();

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: isDarkMode ? "#4CAF50" : "#E6F4EA",
              color: isDarkMode ? "#fff" : "#333",
            },
          },
          error: {
            style: {
              background: isDarkMode ? "#333" : "#fff",
              color: isDarkMode ? "#fff" : "#333",
            },
          },
        }}
      />
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppProvider>
      <ThemeToaster />
      <App />
    </AppProvider>
  </Provider>
);
