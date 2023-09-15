import React from "react";
import "../styles/Description.css"; // Import the CSS file
// eslint-disable-next-line
const CourseDescription = () => {
  return (
    <div className="container">
      <div className="column left-column">
        <img
          className="womanimg"
          src={require("../img/a-woman-in-helsinki.png")}
          alt="a women in helsinki"
        />
      </div>
      <div className="column right-column">
        <h2>Finnish For Beginners</h2>
        <h4>A1 to A2</h4>
        <h3>$200</h3>
        <h4>DESCRIPTION</h4>
        <div>
          <p>
            Enroll in our 6-month course tailored for complete beginners.
            Utilizing the popular "Suomen Mestari 1" textbook as our guide, this
            course offers weekly interactive lessons, quizzes, and a dedicated
            community of learners. Over half a year, you'll acquire essential
            vocabulary and master practical phrases, setting you up for success
            in everyday Finnish conversations.
          </p>
        </div>
        <button class="add-course">Add to Cart</button>
      </div>
    </div>
  );
};

export default CourseDescription;
