import { useState } from "react";
import { backendUrl } from "../api/index.js";
import { Link } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import { silentRefreshLoop } from "../utils/token";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loginUser = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMessage("email and password must be defined");
      return;
    }

    // LOGIN-FETCH:
    fetch(`${backendUrl}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // muss sein für refresh token! -- "save httpOnly cookie session"
    })
      .then((res) => res.json())
      .then(({ success, result, message }) => {
        if (!success) return setErrorMessage(message || "Login failed");
        // result.tokens.refreshToken
        const authorization = `Bearer ${result.tokens.accessToken}`;
        onLoginSuccess(authorization, result.user); // result.user sind die profile infos

        silentRefreshLoop(
          result.tokens.accessToken,
          function onSiletRefreshDoneCallback(newAccessToken) {
            const authorization = `Bearer ${newAccessToken}`;
            onLoginSuccess(authorization, result.user); // update authorization state
          }
        );
        setErrorMessage(""); // reset error message after success
        setSuccessMessage(
          "Login successful, please go to Dashboard and enjoy!"
        );
      });
  };

  return (
    <>
      <Nav />
      <section className="content-wrapper">
        <form className="login-form">
          <h2>Login</h2>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-input">
            <label htmlFor="password">Passwort</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn" onClick={loginUser}>
            Login
          </button>
        </form>

        <p style={{ color: "red" }}>{errorMessage}</p>
        <p style={{ color: "green" }}>{successMessage}</p>

        <Link to="/">
          <button className="btn">Zum Dashboard</button>
        </Link>

        <Link to="/register">
          <button className="btn">Create and Account</button>
        </Link>
      </section>
    </>
  );
};

export default Login;
