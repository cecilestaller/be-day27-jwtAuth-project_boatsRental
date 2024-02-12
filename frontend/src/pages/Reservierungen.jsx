import { useEffect, useState } from "react";
import { backendUrl } from "../api";
import ReservierungsCard from "../components/ReservierungsCard";
import Nav from "../components/Nav";

const Reservierungen = () => {
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
  const aktuelleReservierungen = [...alleBoote].filter((boot) => {
    return boot.reservierung.istReserviert === true;
  });
  return (
    <>
      <Nav />
      <section className="content-wrapper">
        {/* ===== Fix me ======= */}
        {/* Abstände von h2 nach oben und unten weichen von Vorgaben in App.scss ab - Warum???  */}
        <h2>Reservierungen</h2>
        <section className="reservierungen-card-container">
          <article className="reservierungen-card-headline">
            <p>Reservierungsnr.</p>
            <p>Boot</p>
            <p>Reservierungszeitraum</p>
            <p> </p>
          </article>
          {aktuelleReservierungen &&
            aktuelleReservierungen.map((reservierung) => (
              <ReservierungsCard key={reservierung._id} boot={reservierung} />
            ))}
        </section>
      </section>
    </>
  );
};

export default Reservierungen;
