import { Outlet } from "react-router-dom";
import TeacherSidebar from "../components/teacher/TeacherSidebar";
import TeacherHeader from "../components/teacher/TeacherHeader";

const TeacherLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">

      <TeacherSidebar />

      <div className="ml-64 min-h-screen">

        <TeacherHeader />

        <main className="pt-16">
          <div className="p-6">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default TeacherLayout;