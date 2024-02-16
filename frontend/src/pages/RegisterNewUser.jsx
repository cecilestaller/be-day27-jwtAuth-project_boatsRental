import { useState } from "react";
import Nav from "../components/Nav";
import { backendUrl } from "../api";
import { Link, useNavigate } from "react-router-dom";

const RegisterNewUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  // const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // ProfilePicture bei der Registrierung fehl am platz, wird deshalb rausgenommen...

  const registerNewUser = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage("All fields must be defined");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Password confirmation missmatches");
      return;
    }

    fetch(backendUrl + "/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then(({ success, result, error, message }) => {
        console.log({ success, result, error, message });
        if (!success) return setErrorMessage(message || "Registration failed");
        setErrorMessage(""); // reset error message after success
        setSuccessMessage("Registration successful, please verify your Email!");
        navigate("/verify-email/" + result._id);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Nav />
      <section className="content-wrapper">
        <form>
          <h2>Create New Account</h2>

          <div className="form-input">
            <label htmlFor="name">Dein User-Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-input">
            <label htmlFor="bio">Deine Bio:</label>
            <input
              id="bio"
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
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
          <div className="form-input">
            <label htmlFor="password-confirm">Confirm Password</label>
            <input
              id="password-confirm"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {/* <div>
            <label htmlFor="profilePic">Lade ein Profilbild hoch:</label>
            <input
              type="file"
              name="profilePic"
              id="profilePic"
              onChange={(e) => setProfilePictureUrl(e.target.files[0])}
            />
          </div> */}

          <button className="btn" onClick={registerNewUser}>
            Register
          </button>
        </form>
        <p style={{ color: "green" }}>{successMessage}</p>
        {successMessage ? (
          <Link to="/login">
            <button className="btn">Zum Login</button>
          </Link>
        ) : (
          <p style={{ color: "red" }}>{errorMessage}</p>
        )}
      </section>
    </>
  );
};

export default RegisterNewUser;

// FETCH wenn ProfilePic gleich mit hoch geladen werden soll:
// const formData = new FormData();
// formData.append("image", profilePictureUrl, profilePictureUrl.name);
// fetch(`${backendUrl}/api/files/upload`, {
//   method: "POST",
//   body: formData,
// })
//   .then((res) => res.json())
//   .then(({ success, result, error, message }) => {
//     if (success) return result.filename;
//     else {
//       console.log({ message });
//       throw error; // jump to catch
//     }
//   })
//   .then((uploadedFilename) =>
//     fetch(`${backendUrl}/api/users/register`, {
//       method: "POST",
//       body: JSON.stringify({
//         name,
//         email,
//         bio,
//         password,
//         profilePictureUrl: uploadedFilename,
//       }),
//       headers: { "Content-Type": "application/json" },
//     })
//   )
