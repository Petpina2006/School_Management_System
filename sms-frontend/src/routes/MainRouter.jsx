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
import CreateStudent from "../pages/super-admin/CreateStudents"
// import Teachers from "../pages/super-admin/Teachers";
// import Classes from "../pages/super-admin/Classes";
// import Subjects from "../pages/super-admin/Subjects";
// import Enrollments from "../pages/super-admin/Enrollments";
// import Scores from "../pages/super-admin/Scores";
// import Attendance from "../pages/super-admin/Attendance";

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
              {/* <Route path="teachers" element={<Teachers />} />
              <Route path="classes" element={<Classes />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="enrollments" element={<Enrollments />} />
              <Route path="scores" element={<Scores />} />
              <Route path="attendance" element={<Attendance />} /> */}
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
