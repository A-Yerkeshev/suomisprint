import React from "react";
import "../styles/card.css"; // Import the CSS
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Card(props) {
  const { courses, setCourses } = props;
  const redirect = useNavigate();
  const { user, role, dispatch } = useContext(AuthContext);
  const location = useLocation();

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

  let buttons = <button
    className="button-on-card"
    onClick={() => {
      redirect(`/description/${props.id}`);
    }}
  >
    Learn More
  </button>;

  // If this course was published by current user, add edit and delete buttons
  if (props.providerId === user.Id && location.pathname.split("/")[1] === 'mycourses') {
    buttons = <>
      <button
        className="button-on-card"
        onClick={() => {
          redirect(`/description/${props.id}`);
        }}
      >
        Learn More
      </button>
      <button
        className="button-on-card button-narrow"
        onClick={() => {
          redirect(`/editcourse/${props.id}`);
        }}
      >
        Edit
      </button>
      <button
        className="button-on-card button-narrow button-delete"
        onClick={handleDelete}
      >
        Delete
      </button>
      </>
  }

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
          {buttons}
        </div>
      </div>
    </div>
  );
}

export default Card;
