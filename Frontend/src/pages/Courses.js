import React from "react";
import Card from "../components/CourseCard";
import courses from "../data/courses.json";
import image1 from "../img/a-woman-in-helsinki.png";
import image2 from "../img/woman-with-laptop.png"
import image3 from "../img/yki.JPG";
import image4 from "../img/a-woman-with-a-book.png";
import '../styles/card.css';  // Import your CSS if it's not imported elsewhere
import { useState, useEffect } from "react";

const imageMap = {
  "a-woman-in-helsinki": image1,
  "woman-with-laptop": image2,
  "yki": image3,
  "woman-with-a-book": image4
  // map other images
};

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
    <div className="card-container">  {/* Updated this line */}
      <h1 className="heading">Our Courses</h1>
      {courses.map((course, index) => (
        <Card
          key={course.Id}
          level={course.level}
          name={course.title}
          img={course.imageUrl}
          description={course.description}
          price={course.price}
        />
      ))}
    </div>
  );
}

export default Courses;
