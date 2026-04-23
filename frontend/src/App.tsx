import ReactGA from "react-ga4";
ReactGA.initialize("G-CJ1ETDCKHG");
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { loadUser } = useAuth();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return <RouterProvider router={router} />;
}
ReactGA.send({ hitType: "pageview", page: window.location.pathname });
