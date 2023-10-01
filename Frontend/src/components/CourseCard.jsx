import React, { useContext } from "react";
import "../styles/card.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";

function Card(props) {
  const { courses, setCourses } = props;
  const redirect = useNavigate();
  const { role, fetchWithToken } = useContext(AuthContext);

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
    <div className="courses-card">
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
            className="button-on-card"
            onClick={() => {
              redirect(`/description/${props.id}`);
            }}
          >
            Learn More
          </button>
          {role === "TEACHER" && (
            <button
              className="button-on-card button-narrow"
              onClick={() => {
                redirect(`/editcourse/${props.id}`);
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
