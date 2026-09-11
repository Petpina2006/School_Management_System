import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserRoundCheck,
  School,
  BookOpen,
  ClipboardList,
  FileText,
  CalendarCheck,
  Shield,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/super-admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/super-admin/users",
      icon: Users,
    },
    {
      name: "Students",
      path: "/super-admin/students",
      icon: GraduationCap,
    },
    {
      name: "Teachers",
      path: "/super-admin/teachers",
      icon: UserRoundCheck,
    },
    {
      name: "Classes",
      path: "/super-admin/classes",
      icon: School,
    },
    {
      name: "Subjects",
      path: "/super-admin/subjects",
      icon: BookOpen,
    },
    {
      name: "Enrollments",
      path: "/super-admin/enrollments",
      icon: ClipboardList,
    },
    {
      name: "Scores",
      path: "/super-admin/scores",
      icon: FileText,
    },
    {
      name: "Attendance",
      path: "/super-admin/attendance",
      icon: CalendarCheck,
    },
  ];

  const handleLogout = () => {
    // Add logout logic/clear tokens if needed
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 text-slate-100 border-r border-slate-800/80 flex flex-col justify-between z-50 select-none overflow-hidden">
      {/* Background Ambient Lighting Effect */}
      <div className="absolute top-0 -left-10 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-10 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 h-20 px-6 border-b border-slate-800/80 relative z-10 bg-slate-950/50 backdrop-blur-md">
          <div className="p-2.5 bg-blue-600/20 rounded-xl border border-blue-500/30 text-blue-400 shadow-md flex items-center justify-center">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white leading-tight">
              TALUTUN 
            </span>
            <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">
              Super Admin
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5 relative z-10 overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar">
          <div className="px-3 pb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Main Management
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/80 border border-transparent hover:border-slate-800/80"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`h-4 w-4 transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-slate-400 group-hover:text-blue-400"
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    {isActive ? (
                      <ChevronRight className="w-3.5 h-3.5 text-white/70" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="p-4 border-t border-slate-800/80 relative z-10 bg-slate-950/60 backdrop-blur-md">
        <div className="p-2.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex-shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                Admin Panel
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                v2.4 System
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;