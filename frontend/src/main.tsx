import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={googleClientId}>
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
