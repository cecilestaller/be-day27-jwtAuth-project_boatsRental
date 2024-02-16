import { backendUrl } from "../api";

const LogoutButton = ({ onLogout }) => {
  async function doLogout() {
    const response = await fetch(backendUrl + "/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    const { success } = await response.json();
    if (!success) alert("Could not logout");
    onLogout(); // reset local authorization state (with token inside)
  }
  return (
    <button className="btn" onClick={doLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
