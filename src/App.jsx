import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./Login";
import Signup from "./Signup";
import Home from "./components/Home";

import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./Teacherpages/TeacherDashboard";
import AdminDashboard from "./AdminDashboard";

import Courses from "./Teacherpages/Courses";
import Assignments from "./Teacherpages/Assignments";
import Grades from "./Teacherpages/Grades";
import AddAttendance from "./Teacherpages/AddAttendance";
import AttendanceList from "./Teacherpages/AttendanceList";
import AddStudent from "./Teacherpages/AddStudent";
import AssignmentList from "./Teacherpages/AssignmentList";
import CourseList from "./Teacherpages/CourseList";
import GradeList from "./Teacherpages/GradeList";
import StudentList from "./Teacherpages/StudentList";

import StudentSearch from "./Studentpages/StudentSearch";
import AssignmentSearch from "./Studentpages/AssignmentSearch";
import AttendanceSearch from "./Studentpages/AttendanceSearch";

function App() {
  return (
    <BrowserRouter>

      <Header />

  
      <div className="pt-20 min-h-screen">

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/student"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/teacher"
            element={
              <ProtectedRoute role="teacher">
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Teacher Only */}
          <Route path="/courses" element={<ProtectedRoute role="teacher"><Courses /></ProtectedRoute>} />
          <Route path="/assignments" element={<ProtectedRoute role="teacher"><Assignments /></ProtectedRoute>} />
          <Route path="/grades" element={<ProtectedRoute role="teacher"><Grades /></ProtectedRoute>} />
          <Route path="/course-list" element={<ProtectedRoute role="teacher"><CourseList /></ProtectedRoute>} />
          <Route path="/assignment-list" element={<ProtectedRoute role="teacher"><AssignmentList /></ProtectedRoute>} />
          <Route path="/grade-list" element={<ProtectedRoute role="teacher"><GradeList /></ProtectedRoute>} />
          <Route path="/student-list" element={<ProtectedRoute role="teacher"><StudentList /></ProtectedRoute>} />
          <Route path="/Addstudent" element={<ProtectedRoute role="teacher"><AddStudent /></ProtectedRoute>} />
          <Route path="/attendance" element={<ProtectedRoute role="teacher"><AddAttendance /></ProtectedRoute>} />
          <Route path="/attendance-list" element={<ProtectedRoute role="teacher"><AttendanceList /></ProtectedRoute>} />

          {/*  Student Only */}
          <Route path="/student-search" element={<ProtectedRoute role="student"><StudentSearch /></ProtectedRoute>} />
          <Route path="/assignment-search" element={<ProtectedRoute role="student"><AssignmentSearch /></ProtectedRoute>} />
          <Route path="/attendance-search" element={<ProtectedRoute role="student"><AttendanceSearch /></ProtectedRoute>} />

        </Routes>

      </div>

      <Footer />

    </BrowserRouter>
  );
}

export default App;