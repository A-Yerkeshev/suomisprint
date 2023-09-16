import React, { Component } from "react";
import "../styles/FormTable.css"; // Import the CSS file

class CourseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  // Handle input changes and update state
  handleInputChange = (event) => {
    const { name, value, type } = event.target;
    const newValue = type === "number" ? parseFloat(value) : value;

    this.setState({
      [name]: newValue,
    });
  };

  // Handle form submission
  handleSubmit = async (event) => {
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
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="form-table">
        <h1 className="course-heading">Create new course</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="">
            <label htmlFor="imageUrl">Image url:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="shortDescription">Short description:</label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              value={this.state.shortdescription}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="description">Full description:</label>
            <textarea
              id="description"
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="">
            <label htmlFor="level">Level:</label>
            <input
              type="text"
              id="level"
              name="level"
              value={this.state.level}
              onChange={this.handleInputChange}
              required
            />
          </div>

          {/* <div>
            <label htmlFor="startdate">Start date:</label>
            <input
              type="date"
              id="startdate"
              name="startdate"
              value={this.state.startdate}
              onChange={this.handleInputChange}
              // required
            />
          </div>
          <div>
            <label htmlFor="enddate">End date:</label>
            <input
              type="date"
              id="enddate"
              name="enddate"
              value={this.state.enddate}
              onChange={this.handleInputChange}
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
              value={this.state.enrollmentRequirements}
              onChange={this.handleInputChange}
              // required
            />
          </div> */}
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={this.state.price}
              onChange={this.handleInputChange}
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
              value={this.state.maxStudents}
              onChange={this.handleInputChange}
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
}

export default CourseForm;
