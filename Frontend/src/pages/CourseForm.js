import React, { Component } from "react";
import "../styles/CourseForm.css"; // Import the CSS file

class CourseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Define initial course field values in state
      title: "",
      shortdescription: "",
      description: "",
      providerid: "",
      startdate: "",
      enddate: "",
      enrollmentRequirements: "",
      price: "",
      maxStudents: "",
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
  handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the course data, e.g., send it to an API
    console.log("Course created:", this.state);
  };

  render() {
    return (
      <div class="form-table">
        <h1 class="course-heading">Create new course</h1>
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

          <div class="">
            <label htmlFor="providerid">Provider ID:</label>
            <input
              type="text"
              id="providerid"
              name="providerid"
              value={this.state.providerid}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="shortdescription">Short description:</label>
            <textarea
              id="shortdescription"
              name="shortdescription"
              value={this.state.shortdescription}
              onChange={this.handleInputChange}
              // required
            />
          </div>
          <div>
            <label htmlFor="description">Full description:</label>
            <textarea
              id="description"
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
              // required
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
          </div> */}
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
          </div>
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
            <label class="course-label" htmlFor="maxStudents">
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
            <button class="course-button" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CourseForm;
