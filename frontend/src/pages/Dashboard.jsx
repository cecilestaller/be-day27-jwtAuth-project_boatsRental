import "./Dashboard.scss";
import { useEffect, useState } from "react";
import { backendUrl } from "../api";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const Dashboard = ({ authorization, userProfileInfo, onLogout }) => {
  const [alleBoote, setAlleBoote] = useState([]);

  // Anzahl aller Boote
  useEffect(() => {
    async function fetchAlleBoote() {
      try {
        const boote = await fetch(`${backendUrl}/api/boote`);
        const { result, success, error } = await boote.json();
        if (!success) throw new Error(error);
        return setAlleBoote(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAlleBoote();
  }, []);

  // console.log(alleBoote);

  // Anzahl aktuelle Reservierungen (reservierung.istReserviert: true)
  const aktuelleReservierungen = [...alleBoote].filter((boot) => {
    return boot.reservierung.istReserviert === true;
  });
  // console.log(aktuelleReservierungen.length);

  // Anzahl der verfügbaren Boote (alle Boote - nicht verfügbarer Boote)
  const today = new Date();
  const besetzteBoote = [...alleBoote].filter(
    (boot) =>
      new Date(boot.reservierung.startdatum) <= today &&
      today <= new Date(boot.reservierung.enddatum)
  );

  const verfuegbareBoote = alleBoote.length - besetzteBoote.length;
  // console.log("verfügbare Boote: ", verfuegbareBoote);

  return (
    <>
      <Nav />

      <section className="content-wrapper">
        <h2>Dashboard</h2>
        {authorization && <LogoutButton onLogout={onLogout} />}
        {!authorization ? (
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>
        ) : (
          <h2>Willkommen {userProfileInfo?.name}</h2>
        )}

        {!authorization ? (
          <Link to="/register">
            <button className="btn">Create New Account</button>
          </Link>
        ) : null}
        <section className="dashboard-card-container">
          <article className="dashboard-card">
            <h3>
              Aktuelle <br />
              Reservierungen
            </h3>
            <p>{aktuelleReservierungen.length}</p>
            {/* On-Click: Gehe zu Reservierungen.jsx */}
            <Link className="btn" to="/reservierungen">
              anzeigen
            </Link>
          </article>

          <article className="dashboard-card">
            <h3>
              Verfügbare <br />
              Boote
            </h3>
            <p>{verfuegbareBoote}</p>
            {/* ====== Fix me: Verlinkung zu Reservierungen so lassen? Oder anderen Link angeben ======= */}
            <Link className="btn" to="/reservierungen">
              anzeigen
            </Link>
          </article>

          <article className="dashboard-card">
            <h3>
              Gesamtanzahl <br />
              Boote
            </h3>
            <p>{alleBoote.length}</p>
            <Link className="btn" to="/boatlist">
              anzeigen
            </Link>
          </article>
        </section>
      </section>
    </>
  );
};

export default Dashboard;
