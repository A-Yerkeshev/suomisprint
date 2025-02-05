import React from "react";
import "../styles/CourseForm.css"; // Import the CSS file
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext, ROLE } from '../context/AuthContext.js';

function CourseForm(props) {
  const { user, role, fetchWithToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== ROLE.TEACHER) {
      navigate('/');  // Redirect to home page
    }
  }, [role, navigate]);

  const providerId = (user && user.Id) || "";

  const [course, setCourse] = useState({
    providerId,
    title: "",
    description: "",
    shortDescription: "",
    level: "",
    price: "",
    imageUrl: "",
    maxStudents: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  const redirect = useNavigate();
  const location = useLocation();

  // Determine whether it is a create or edit page
  const uriParts = location.pathname.split("/");
  const action = uriParts[1] === "editcourse" ? "PATCH" : "POST";
  let id;

  if (action === "PATCH") {
    id = uriParts[2];
  }

  // If /editcourse/:id - get data of course being edited
  useEffect(() => {
    if (action === "PATCH") {
      const fetchCourse = async () => {
        try {
          const res = await fetch(
            process.env.REACT_APP_BACKEND_URL + "/api/courses/" + id
          );

          if (!res.ok) {
            redirect("/");
          }

          const course = await res.json();
          setCourse(course);
        } catch (err) {
          console.log(err);
        }
      };

      fetchCourse();

      document.getElementsByClassName("course-heading")[0].textContent =
        "Update course";
      document.getElementById("form-submit").textContent = "Update";
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCourse({
      ...course,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    //Array of default images
    const defaultImages = [
      '../img/woman-image.png',
      '../img/a-woman-in-helsinki.png',
      '../img/a-woman-with-a-book.png',
      '../img/man-in-the-sen-square.png',
      '../img/woman-with-laptop.png'
    ];

    if (!course.imageUrl) {
      const randomIndex = Math.floor(Math.random() * defaultImages.length);
      course.imageUrl = defaultImages[randomIndex];
    }

    try {
      const endpoint =
        action === "PATCH" ? `/api/courses/${id}` : "/api/courses";

      const res = await fetchWithToken(process.env.REACT_APP_BACKEND_URL + endpoint, {
        method: action,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });

      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.error);
      }

      redirect("/mycourses");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-table">
      <h1 className="course-heading">Create new course</h1>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={course.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="imageUrl">Image url:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={course.imageUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="shortDescription">Short description:</label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            value={course.shortDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Full description:</label>
          <textarea
            id="description"
            name="description"
            value={course.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="level">Level:</label>
          <input
            type="text"
            id="level"
            name="level"
            value={course.level}
            onChange={handleChange}
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
            value={course.price}
            onChange={handleChange}
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
            value={course.maxStudents}
            onChange={handleChange}
            // required
          />
        </div>

        <div>
          <button
            id="form-submit"
            className="course-button"
            type="submit"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CourseForm;
