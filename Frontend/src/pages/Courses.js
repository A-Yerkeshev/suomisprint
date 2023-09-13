import React from "react";
import Card from "../components/CourseCard";
import courses from "../data/courses.json";
import image1 from "../img/a-woman-in-helsinki.png";
import image2 from "../img/woman-with-laptop.png"
import image3 from "../img/yki.JPG";
import image4 from "../img/a-woman-with-a-book.png";
import '../styles/card.css';  // Import your CSS if it's not imported elsewhere

const imageMap = {
  "a-woman-in-helsinki": image1,
  "woman-with-laptop": image2,  
  "yki": image3,
  "woman-with-a-book": image4  
  // map other images
};

function Courses() {
  return (
    <div className="card-container">  {/* Updated this line */}
      <h1 className="heading">Our Courses</h1>
      {courses.map((course, index) => (
        <Card
          key={index}
          level={course.level}
          name={course.name}
          img={imageMap[course.img]}
          description={course.description}
          price={course.price}
        />
      ))}
    </div>
  );
}

export default Courses;
