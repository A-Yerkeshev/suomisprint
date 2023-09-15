import React from "react";
import "../styles/card.css"; // Import the CSS

function Card(props) {
  return (
    <div className="card">
      <div className="top-card">
        <img src={props.img} alt={`${props.name} course`} />
      </div>
      <div className="bottom-card">
        <p>{props.level}</p>
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <p>&euro;{props.price}</p>
      </div>
    </div>
  );
}

export default Card;
