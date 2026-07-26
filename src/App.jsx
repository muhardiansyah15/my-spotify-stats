import { useEffect, useState } from "react";
import { handleRedirectCallback, getAccessToken, logout } from "./spotify/auth";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

export default function App() {
  const [status, setStatus] = useState("checking"); // checking | anonymous | authed
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const callbackToken = await handleRedirectCallback();
        const token = callbackToken || (await getAccessToken());
        if (!cancelled) setStatus(token ? "authed" : "anonymous");
      } catch (err) {
        if (!cancelled) {
          setAuthError(err.message);
          setStatus("anonymous");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = () => {
    logout();
    setAuthError(null);
    setStatus("anonymous");
  };

  const handleSessionExpired = () => {
    setAuthError("Your session expired — please log in again.");
    setStatus("anonymous");
  };

  return (
    <div className="app">
      {status === "checking" && (
        <div className="page-loader" role="status" aria-label="Loading">
          <span className="eq" aria-hidden="true">
            <i /><i /><i /><i /><i />
          </span>
        </div>
      )}
      {status === "anonymous" && <Login error={authError} />}
      {status === "authed" && (
        <Dashboard onLogout={handleLogout} onSessionExpired={handleSessionExpired} />
      )}
      <Footer />
    </div>
  );
}
