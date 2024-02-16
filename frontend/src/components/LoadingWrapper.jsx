// 1. trigger refresh token --> Loading...
// 2. if newAccessToken  --> show content of LoadingWrapper
//          <LoadingWrapper> content </LoadingWrapper>
//    else navigate to Dashboard with "open data"

import { useEffect, useState } from "react";
import { doSilentRefresh, silentRefreshLoop } from "../utils/token.js";
import { Navigate, useLocation } from "react-router-dom";

const LoadingWrapper = ({ authorization, saveAuthorization, children }) => {
  const [isLoading, setIsLoading] = useState(true);

  console.log({ isLoading, authorization });

  useEffect(() => {
    async function tryRefreshToken() {
      // wenn bereits eingeloggt, nicht neu refreshen
      if (!isLoading) return;
      if (authorization) {
        setIsLoading(false);
        return;
      }
      console.log("trying to refresh token");
      // nicht eingeloggt (kein token, keine authorization) -> refresh probieren
      try {
        const accessToken = await doSilentRefresh();
        const authorization = `Bearer ${accessToken}`;
        saveAuthorization(authorization); // Lift state up to App.jsx
        setIsLoading(false);

        silentRefreshLoop(accessToken, (newAccessToken) => {
          const authorization = `Bearer ${newAccessToken}`;
          saveAuthorization(authorization);
        });
      } catch (error) {
        console.log("Fehler im LW");
        console.log(error);
        setIsLoading(false);
      }
    }

    tryRefreshToken();
  }, []);

  const location = useLocation();
  if (isLoading) {
    return <p>Loading...</p>;
  } else if (authorization) {
    return <>{children}</>; // Zeige den Inhalt vom Wrapper an
  } else {
    return location.pathname === "/" ? <>{children}</> : <Navigate to={"/"} />;
  }
};

export default LoadingWrapper;
