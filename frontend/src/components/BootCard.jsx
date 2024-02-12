import { Link } from "react-router-dom";
import "./BootCard.scss";
import { backendUrl } from "../api";

const BootCard = ({
  authorization,
  userProfileInfo,
  _id,
  name,
  baujahr,
  bootsart,
  bildUrl,
  errFunc,
}) => {
  const deleteBoat = () => {
    fetch(`${backendUrl}/api/boote/${_id}`, {
      method: "DELETE",
      headers: { authorization }, // Include authorization string in header authorization field !!!
    })
      .then((res) => res.json())
      .then(({ success }) => console.log(success))
      .catch((err) => console.log(err));
    window.location.reload();
  };
  return (
    <article className="boat-card">
      <Link to={`/boat-detail/${_id}`}>
        <img src={bildUrl} alt="boot" onError={errFunc} />
      </Link>
      <div className="card-text-container">
        <p className="boot-name">{name}</p>
        <p className="boot-typ">{bootsart}</p>
        <p className="baujahr">(Baujahr: {baujahr})</p>
        <Link className="btn" to={`/add-reservierung/${_id}`}>
          reservieren
        </Link>
        <button className="btn" onClick={deleteBoat}>
          Boot löschen
        </button>
      </div>
    </article>
  );
};

export default BootCard;
