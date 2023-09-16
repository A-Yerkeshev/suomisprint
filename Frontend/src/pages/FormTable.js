import React, { useState } from "react";
import "../styles/FormTable.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

function CourseForm() {
  const [state, setState] = useState({
    // Define initial course field values in state
    title: "",
    shortDescription: "",
    description: "",
    providerId: "",
    startDate: "",
    endDate: "",
    enrollmentRequirements: "",
    price: "",
    maxStudents: "",
    imageUrl: "",
    level: ""
  });

  const redirect = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.error);
      }

      redirect('/courses');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-table">
      <h1 className="course-heading">Create new course</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
          />
        </div>

        <div className="">
          <label htmlFor="imageUrl">Image url:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            required
          />
        </div>

        <div>
            <label htmlFor="shortDescription">Short description:</label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              required
            />
          </div>

          <div>
            <label htmlFor="description">Full description:</label>
            <textarea
              id="description"
              name="description"
              required
            />
          </div>

          <div className="">
            <label htmlFor="level">Level:</label>
            <input
              type="text"
              id="level"
              name="level"
              required
            />
          </div>

          {/* <div>
            <label htmlFor="startdate">Start date:</label>
            <input
              type="date"
              id="startdate"
              name="startdate"
              // required
            />
          </div>
          <div>
            <label htmlFor="enddate">End date:</label>
            <input
              type="date"
              id="enddate"
              name="enddate"
              // required
            />
          </div>
          <div>
            <label htmlFor="enrollmentRequirements">
              Enrollment requirements:
            </label>
            <input
              type="text"
              id="enrollmentRequirements"
              name="enrollmentRequirements"
              // required
            />
          </div> */}
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              // required
            />
          </div>
          <div>
            <label className="course-label" htmlFor="maxStudents">
              Max Students:
            </label>
            <input
              type="number"
              id="maxStudents"
              name="maxStudents"
              // required
            />
          </div>

        <div>
          <button className="course-button" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CourseForm;
