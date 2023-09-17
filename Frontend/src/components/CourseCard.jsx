import React from "react";
import "../styles/card.css"; // Import the CSS
import { useNavigate } from "react-router-dom";

function Card(props) {
  const { courses, setCourses } = props;
  const redirect = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/courses/" + props.id,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.error);
      }

      const deleted = await res.json();
      setCourses(courses.filter((course) => course.Id != deleted.Id));
    } catch (err) {
      console.log(err);
    }
  };

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
        <button
          onClick={() => {
            redirect(`/editcourse/${props.id}`);
          }}
        >
          Edit
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default Card;
