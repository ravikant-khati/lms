import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store.js";
import { Toaster } from "@/components/ui/sonner";
import { useLoadUserQuery } from "./features/apis/authAPI.js";

const Loader = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>{isLoading ? <h1 className="text-center h-full font-bold text-5xl">loading</h1> : children }</>;
};

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <Loader>
      <>
        <App />
        <Toaster />
      </>
    </Loader>
  </Provider>
);
