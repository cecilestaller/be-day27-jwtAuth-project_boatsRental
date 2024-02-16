import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { backendUrl } from "../api";
import Nav from "../components/Nav";

const VerifyEmail = () => {
  const [sixDigitCode, setSixDigitCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { userId } = useParams();

  async function verifyEmail(event) {
    event.preventDefault();
    if (!sixDigitCode) {
      setErrorMessage(
        "Please enter your six digit code, we have sent you an email"
      );
      return;
    }

    fetch(backendUrl + "/api/users/verifyEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, sixDigitCode }),
    })
      .then((res) => res.json())
      .then(({ success, result, message }) => {
        if (!success)
          return setErrorMessage(message || "Email verifcation failed");
        console.log({ result });
        setErrorMessage(""); // reset error message after success
        setSuccessMessage(
          "Verifications successful, You can now login to your account."
        );
      });
  }

  async function resendEmail() {
    fetch(backendUrl + "/api/users/resendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then(({ success, message }) => {
        if (!success) return setErrorMessage(message || "Email resend failed");
        setErrorMessage("E-Mail was resent, please check your Inbox");
      });
  }

  return (
    <main>
      <Nav />
      <section className="content-wrapper">
        <h2>Verify your email</h2>
        <p>
          Almost done, your accounted was created successfully 🥳, please enter
          the 6-digit code we sent to your email to enable login
        </p>

        <form>
          <div className="form-input">
            <label htmlFor="sixDigitCode">
              Enter 6-digit verifcation code:
            </label>
            <input
              id="sixDigitCode"
              type="text"
              value={sixDigitCode}
              onChange={(e) => setSixDigitCode(e.target.value)}
            />
          </div>

          <button className="btn" onClick={verifyEmail}>
            Verify Email
          </button>

          <p style={{ color: "red" }}>{errorMessage}</p>
          <p style={{ color: "green" }}>{successMessage}</p>
        </form>

        <button className="btn" onClick={resendEmail}>
          Resend Email
        </button>

        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
      </section>
    </main>
  );
};

export default VerifyEmail;
