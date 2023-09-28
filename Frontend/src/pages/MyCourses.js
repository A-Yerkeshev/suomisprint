import React from "react";
import Card from "../components/CourseCard";
import '../styles/card.css'; 
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function MyCourses() {
    const { fetchWithToken } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const url = process.env.REACT_APP_BACKEND_URL + '/api/mycourses';
    
        const fetchCourses = async () => {
          const res = await fetchWithToken(url);  // Use fetchWithToken here
          if (res.ok) {
            const courses = await res.json();
            setCourses(courses);
            console.log(courses);
          } else {
            console.error("Failed to fetch courses");
          }
        }

    fetchCourses();
  }, []);

  return (
    <>
      <div className="heading-container">
      <h1 className="courses-heading">My Courses</h1>
    </div>
      <div className="card-container">
        {courses.map((course, index) => (
          <Card
            key={course._id}
            id={course._id}
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

export default MyCourses;
