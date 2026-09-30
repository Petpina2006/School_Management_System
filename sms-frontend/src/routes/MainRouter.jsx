import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import Dashboard from "../pages/super-admin/Dashboard";
import Users from "../pages/super-admin/Users";
import CreateUser from "../pages/super-admin/CreateUser";
import Students from "../pages/super-admin/Students";
import CreateStudent from "../pages/super-admin/CreateStudents";
import CreateTeachers from "../pages/super-admin/CreateTeachers";
import Teachers from "../pages/super-admin/Teachers";
import Classes from "../pages/super-admin/Classes";
import CreateClasses from "../pages/super-admin/CreateClasses";
import CreateSubjects from "../pages/super-admin/CreateSubjects";
import Subjects from "../pages/super-admin/Subjects";
import Enrollments from "../pages/super-admin/Enrollments";
import CreateEnrollment from "../pages/super-admin/CreateEnrollment";
import Scores from "../pages/super-admin/Scores";
import CreateScore from "../pages/super-admin/CreateScore";

import TeacherLayout from "../layouts/TeacherLayout";

import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import TeacherProfile from "../pages/teacher/TeacherProfile";
import TeacherStudents from "../pages/teacher/TeacherStudents";
import TeacherClasses from "../pages/teacher/TeacherClasses";
import TeacherSubjects from "../pages/teacher/TeacherSubjects";
import TeacherScores from "../pages/teacher/TeacherScores";
import TeacherAttendance from "../pages/teacher/TeacherAttendance";
import SuperAdminProfile from "../pages/super-admin/SuperAdminProfile";
const MainRouter = () => {
  return (
    <>
      <Routes>
        {/* Public */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          {/* Super Admin */}
          <Route element={<RoleRoute allowedRoles={["super_admin"]} />}>
            <Route path="/super-admin" element={<SuperAdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<SuperAdminProfile />} />
              <Route path="users" element={<Users />} />
              <Route
                path="/super-admin/users/create"
                element={<CreateUser />}
              />
              <Route path="students" element={<Students />} />
              <Route
                path="/super-admin/students/create"
                element={<CreateStudent />}
              />
              <Route path="teachers" element={<Teachers />} />
              <Route
                path="/super-admin/teachers/create"
                element={<CreateTeachers />}
              />
              <Route path="/super-admin/classes" element={<Classes />} />
              <Route
                path="/super-admin/classes/create"
                element={<CreateClasses />}
              />
              <Route path="subjects" element={<Subjects />} />
              <Route
                path="/super-admin/subjects/create"
                element={<CreateSubjects />}
              />
              <Route path="enrollments" element={<Enrollments />} />
              <Route
                path="/super-admin/enrollments/create"
                element={<CreateEnrollment />}
              />
              <Route
                path="/super-admin/scores/create"
                element={<CreateScore />}
              />
              <Route path="scores" element={<Scores />} />
              {/* <Route path="attendance" element={<Attendance />} />  */}
            </Route>
          </Route>
          {/* Teacher */}
          <Route element={<RoleRoute allowedRoles={["teacher"]} />}>
            <Route path="/teacher" element={<TeacherLayout />}>
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="profile" element={<TeacherProfile />} />
              <Route path="students" element={<TeacherStudents />} />
              <Route path="classes" element={<TeacherClasses />} />
              <Route path="subjects" element={<TeacherSubjects />} />
              <Route path="scores" element={<TeacherScores />} />
              <Route path="attendance" element={<TeacherAttendance />} />
            </Route>
          </Route>
        </Route>

        {/* Unauthorized */}

        <Route
          path="/unauthorized"
          element={
            <div className="flex min-h-screen items-center justify-center">
              <h1 className="text-3xl font-bold text-red-500">
                403 - Unauthorized
              </h1>
            </div>
          }
        />

        {/* Default */}

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default MainRouter;
