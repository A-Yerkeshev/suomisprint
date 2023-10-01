import React, { useState, useEffect, useContext } from "react";
import "../styles/Description.css";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext.js';

const CourseDescription = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id: courseId } = useParams();
  const { role, fetchWithToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(null);

  useEffect(() => {
    const checkIfEnrolled = async () => {
      try {
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/courses/enroll/${courseId}`;
        const res = await fetchWithToken(url, { method: 'GET' });
        const data = await res.json();

        if (data.isEnrolled) {
          setIsEnrolled(true);
        } else {
          setIsEnrolled(false);
        }
      } catch (err) {
        console.error("Error checking enrollment:", err);
      }
    };
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
    checkIfEnrolled();
  }, [courseId, fetchWithToken]);

  const handleEnroll = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/courses/enroll/${courseId}`;
      let method = 'POST';
      let action = 'enrolling';

      if (isEnrolled) {
        method = 'DELETE';
        action = 'canceling enrollment';
      }

      const res = await fetchWithToken(url, {
        method,
      });

      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.error);
      }

      // Toggle the enrollment status after successful operation
      setIsEnrolled(!isEnrolled);

      console.log(`Successfully ${action}`);
    } catch (err) {
      console.log(`Error:`, err);
    }
  };

  const renderButton = () => {
    console.log("is enrolled?", isEnrolled);
    if (!role) return <p>Register or log in to be able to enroll.</p>;
    if (role === 'TEACHER') return (
      <button
            className="button-on-card button-narrow"
            onClick={() => {
              navigate(`/editcourse/${courseId}`);
            }}
          >
          Edit
        </button>
    );
    return (
      <button className="add-course-button" onClick={handleEnroll}>
        {isEnrolled ? 'Cancel Enrollment' : 'Enroll'}
      </button>
    );
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
        {renderButton()}
      </div>
    </div>
  );
};

export default CourseDescription;