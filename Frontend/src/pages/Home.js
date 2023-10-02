import React, { useContext } from 'react';
import {AuthContext } from '../context/AuthContext.js'
import '../styles/App.css';
import manInTheSenSquare from '../img/man-in-the-sen-square.png';
import womanImage from '../img/woman-image.png';
import kidImage from '../img/kid-image.png';
import teacherImage from '../img/teacher-image.png';
import Button from '../components/Button';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  const handleLearnMoreClick = () => {
    navigate("/courses");
  };

  const handleCourseClick = () => {
    navigate("/addcourse");
  };

  const handleEditClick = () => {
    navigate("/editcourses");
  };

  return (
    <div className="home-container">
      <div className="left-section">
        <div className="welcome-text">Welcome</div>
        <div className="big-text">
          SuomiSprint<br />
          Online Finnish<br />
          courses
        </div>
        <div className="small-text">
          {role === 'TEACHER' ? 'Become a teacher at Suomi Sprint' : 'Learn Finnish online in small groups'}
        </div>
        <div className="two-buttons">
          {role === 'TEACHER' && (
            <>
              <Button color="coral" onClick={handleEditClick} text="Edit courses" />
              <Button color="blue" onClick={handleCourseClick} text="Add course" />
            </>
          )}
          {role === null && (
            <>
              <Link to="/register">
                    <Button color="coral" text="Join Us" />
              </Link>
              <Link to="/login">
                      <Button color="blue" text="Log in" />
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="right-section">
        <div className="coral-square"></div>
        <img className="big-image" src={role === 'TEACHER' ? teacherImage : manInTheSenSquare} alt="Person" />
        <img className="small-image" src={role === 'TEACHER' ? kidImage : womanImage} alt="Person" />
      </div>
    </div>
  );
}

export default Home;
