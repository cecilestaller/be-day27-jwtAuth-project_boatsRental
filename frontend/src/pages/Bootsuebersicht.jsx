import { useEffect, useState } from "react";
import { backendUrl } from "../api";
import BootCard from "../components/BootCard";
import bootfb from "../assets/img/bootfb.jpeg";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";

const Bootsuebersicht = ({ authorization, userProfileInfo }) => {
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
  const errFunc = (event) => {
    event.target.src = bootfb;
  };
  return (
    <>
      <Nav />
      <section className="content-wrapper">
        {/* ===== Fix me ======= */}
        {/* Abstände von h2 nach oben und unten weichen von Vorgaben in App.scss ab - Warum???  */}
        <h2>Übersicht Boote</h2>
        {!authorization ? (
          <Link to="/login">
            <button className="btn">Login um ein Boot hinzuzufügen</button>
          </Link>
        ) : (
          <Link to="/add-boot" className="btn">
            Neues Boot hinzufügen
          </Link>
        )}

        <section className="boat-card-container">
          {alleBoote &&
            alleBoote.map((boot) => (
              <BootCard
                authorization={authorization}
                userProfileInfo={userProfileInfo}
                key={boot._id}
                _id={boot._id}
                name={boot.name}
                baujahr={boot.baujahr}
                bootsart={boot.bootsart}
                bildUrl={
                  boot.bildUrl
                    ? `${backendUrl}/download/${boot.bildUrl}`
                    : bootfb
                }
                errFunc={errFunc}
              />
            ))}
        </section>
      </section>
    </>
  );
};

export default Bootsuebersicht;
