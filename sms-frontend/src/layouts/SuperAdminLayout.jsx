import { Outlet } from "react-router-dom";
import Sidebar from "../components/super-admin/Sidebar";
import Navbar from "../components/super-admin/Navbar";

const SuperAdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800 flex relative overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Background Soft Blue Accents */}
      <div className="fixed top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-10 w-[500px] h-[500px] rounded-full bg-indigo-100/30 blur-[140px] pointer-events-none" />

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative z-10">
        {/* Top Header Navbar */}
        <Navbar/>

        {/* Dynamic Page Outlet Container */}
        <main className="flex-1 pt-25 p-8 space-y-6 max-w-8xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="px-8 py-4 border-t border-slate-200/80 bg-white/60 backdrop-blur-md text-xs text-slate-500 flex justify-between items-center max-w-8xl w-full mx-auto">
          <p>
            © {new Date().getFullYear()} TALUTUN High School. All rights
            reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Online
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
