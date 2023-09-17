import React, { useState, useEffect } from "react";
import "../styles/Description.css"; // Import the CSS file
import { useParams } from "react-router-dom";

const CourseDescription = (props) => {
  const [course, setCourse] = useState(null);
  const { id: courseId } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/courses/${courseId}`;
      const res = await fetch(url);
      const data = await res.json();
      setCourse(data);
    };

    fetchCourse();
  }, [courseId]);

  if (!course) return <div>Loading...</div>;

  const { title, level, price, description, imageUrl } = course;

  return (
    <div className="container">
      <div className="column left-column">
        <img className="womanimg" src={imageUrl} alt={`${title}`} />
      </div>
      <div className="column right-column">
        <h2 className="h2-description">{title}</h2>
        <h4 className="h4-description">{level}</h4>
        <h3 className="h3-description">${price}</h3>
        <h4>DESCRIPTION</h4>
        <div>
          <p className="p-description">{description}</p>
        </div>
        <button className="add-course-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default CourseDescription;
