import React from "react";
import Card from "../components/EditCourse.jsx";
import '../styles/card.css';  // Import your CSS if it's not imported elsewhere
import { useState, useEffect, useContext } from "react";  // Combined multiple imports
import { useNavigate } from 'react-router-dom';
import { AuthContext, ROLE } from '../context/AuthContext.js';

function EditCourses() {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Redirect if role is not TEACHER
  useEffect(() => {
    if (role !== ROLE.TEACHER) {
      navigate('/');// Redirect to home page
    }
  }, [role, navigate]);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_URL + '/api/courses';

    const fetchCourses = async () => {
      const res = await fetch(url);
      const courses = await res.json();

      setCourses(courses);
      console.log(courses);
    }

    fetchCourses();
  }, []);

  return (
    <>
      <div className="heading-container">
        <h1 className="courses-heading">Our Courses</h1>
      </div>
      <div className="card-container">
        {courses.map((course, index) => (
          <Card
            key={course.Id}
            id={course.Id}
            level={course.level}
            name={course.title}
            img={course.imageUrl}
            description={course.description}
            price={course.price}
            courses={courses}
            setCourses={setCourses}
          />
        ))}
      </div>
    </>
  );
}

export default EditCourses;
