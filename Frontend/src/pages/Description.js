import React, { useState, useEffect, useContext } from "react";
import "../styles/Description.css";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext.js';

const CourseDescription = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id: courseId } = useParams();
  const { fetchWithToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/courses/${courseId}`;
        const res = await fetch(url);
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.log("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/courses/enroll/${courseId}`;
      const res = await fetchWithToken(url, {
        method: 'POST',
      });

      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.error);
      }

      navigate('/mycourses');
    } catch (err) {
      console.log("Error enrolling:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  const { title, level, price, description, imageUrl } = course;

  return (
    <div className="container">
      <div className="column left-column">
        <img className="womanimg" src={imageUrl} alt={title} />
      </div>
      <div className="column right-column">
        <h2 className="h2-description">{title}</h2>
        <h4 className="h4-description">{level}</h4>
        <h3 className="h3-description">${price}</h3>
        <h4>DESCRIPTION</h4>
        <p className="p-description">{description}</p>
        <button className="add-course-button" onClick={handleEnroll}>Enroll</button>
      </div>
    </div>
  );
};

export default CourseDescription;
