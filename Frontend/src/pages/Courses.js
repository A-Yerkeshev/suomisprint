//courses.js
import React from "react";
import Card from "../components/CourseCard";
import '../styles/card.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Courses() {
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
            description={course.shortDescription}
            price={course.price}
            courses={courses}
            setCourses={setCourses}
          />
        ))}
      </div>
    </>
  );
}

export default Courses;
