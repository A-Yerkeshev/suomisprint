// Home.js
import "../styles/App.css";
import kidImage from "../img/kid-image.png";
import teacherImage from "../img/teacher-image.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import CourseForm from "./CourseForm";

function Teacher() {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    console.log("Publish a course button clicked");
    navigate("/addcourse");
  };

  const handleEditClick = () => {
    console.log("Edit courses button clicked");
    navigate("/editcourses");
  }

  return (
    <div className="home-container">
      <div className="left-section">
        <div className="welcome-text">Welcome</div>
        <div className="big-text">
          SuomiSprint
          <br />
          Online Finnish
          <br />
          courses
        </div>
        <div className="small-text">Become a teacher at Suomi Sprint</div>
        <div className="two-buttons">
          <Button 
            color="coral" 
            onClick={handleEditClick}
            text="Edit courses" />
          
          <Button
            color="blue"
            onClick={handleCourseClick}
            text="Add course"
          />
        </div>
      </div>
      <div className="right-section">
        <div className="coral-square"></div>
        <img className="kid-image" src={kidImage} alt="Kid" />
        <img className="teacher-image" src={teacherImage} alt="Teacher" />
      </div>
    </div>
  );
}

export default Teacher;
