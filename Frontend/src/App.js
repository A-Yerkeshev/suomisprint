import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Teacher from "./pages/Teacher";
import Layout from "./pages/Layout";
import CourseForm from "./pages/CourseForm";
import CourseDescription from "./pages/Description";
import EditCourses from "./pages/EditCourses";
import Register from "./pages/Register";
import GlobalContext from "./components/GlobalContext";
import Login from "./pages/Login";

function App() {
  const currentUserContext = useState(null);

  return (
    <BrowserRouter>
      <GlobalContext.Provider value={{currentUserContext}}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="About" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="teacher" element={<Teacher />} />
            <Route path="addcourse" element={<CourseForm />} />
            <Route path="editcourse/:id" element={<CourseForm />} />
            <Route path="description/:id" element={<CourseDescription />} />
            <Route path="editcourses" element={<EditCourses />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}

export default App;
