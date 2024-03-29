import "./Nav.scss";
import dashboardIcon from "./../assets/img/icons/icon-compass-white.png";
import bootIcon from "./../assets/img/icons/icon-boat-white.png";
import reservierungIcon from "./../assets/img/icons/icon-calender-white.png";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <section className="nav">
        <nav>
          {/* Home - Dashboard */}
          <NavLink to="/" className="nav-link-dashboard">
            <img src={dashboardIcon} alt="Dashboard" />
          </NavLink>

          <div className="nav-container-middle">
            {/* Übersicht alle Boote */}
            <NavLink to="/boatlist">
              <img src={bootIcon} alt="Boote" />
            </NavLink>

            {/* Übersicht alle Reservierungen */}
            <NavLink to="/reservierungen">
              <img src={reservierungIcon} alt="Reservierungen" />
            </NavLink>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Nav;
