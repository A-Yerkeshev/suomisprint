import React from "react";
import "../styles/Description.css"; // Import the CSS file
// eslint-disable-next-line
const CourseDescription = () => {
  return (
    <div class="container">
      <div class="column left-column">
        <img
          class="womanimg"
          src={require("../img/a-woman-in-helsinki.png")}
          alt="a women in helsinki"
        />
      </div>
      <div class="column right-column">
        <h2 class="h2-description">Finnish For Beginners</h2>
        <h4 class="h4-description">A1 to A2</h4>
        <h3 class="h3-description">$200</h3>
        <h4>DESCRIPTION</h4>
        <div>
          <p class="p-description">
            Enroll in our 6-month course tailored for complete beginners.
            Utilizing the popular "Suomen Mestari 1" textbook as our guide, this
            course offers weekly interactive lessons, quizzes, and a dedicated
            community of learners. Over half a year, you'll acquire essential
            vocabulary and master practical phrases, setting you up for success
            in everyday Finnish conversations.
          </p>
        </div>
        <button class="add-course-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default CourseDescription;
