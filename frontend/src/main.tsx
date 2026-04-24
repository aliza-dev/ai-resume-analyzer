import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import App from "./App";
import { GOOGLE_CLIENT_ID } from "./utils/constants";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <App />
    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "12px",
          fontSize: "14px",
        },
      }}
    />
  </GoogleOAuthProvider>
);
