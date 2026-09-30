import {
    LayoutDashboard,
    User,
    GraduationCap,
    School,
    BookOpen,
    FileText,
    CalendarCheck,
    ShieldCheck,
    LogOut,
    ChevronRight,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TeacherSidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/teacher/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "My Profile",
            path: "/teacher/profile",
            icon: User,
        },
        {
            name: "My Students",
            path: "/teacher/students",
            icon: GraduationCap,
        },
        {
            name: "My Classes",
            path: "/teacher/classes",
            icon: School,
        },
        {
            name: "My Subjects",
            path: "/teacher/subjects",
            icon: BookOpen,
        },
        {
            name: "Student Scores",
            path: "/teacher/scores",
            icon: FileText,
        },
        {
            name: "Attendance",
            path: "/teacher/attendance",
            icon: CalendarCheck,
        },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 select-none flex-col justify-between overflow-hidden border-r border-slate-800/80 bg-slate-950 text-slate-100">

            {/* ================= AMBIENT LIGHTING ================= */}

            <div className="pointer-events-none absolute -left-10 top-0 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="pointer-events-none absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-indigo-600/10 blur-3xl" />

            <div>

                {/* ================= BRAND HEADER ================= */}

                <div className="relative z-10 flex h-20 items-center gap-3 border-b border-slate-800/80 bg-slate-950/50 px-6 backdrop-blur-md">

                    <div className="flex items-center justify-center rounded-xl border border-blue-500/30 bg-blue-600/20 p-2.5 text-blue-400 shadow-md">

                        <GraduationCap className="h-6 w-6" />

                    </div>

                    <div className="flex flex-col">

                        <span className="text-base font-bold leading-tight tracking-tight text-white">
                            TALUTUN
                        </span>

                        <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">
                            Teacher Portal
                        </span>

                    </div>

                </div>


                {/* ================= NAVIGATION ================= */}

                <nav className="custom-scrollbar relative z-10 max-h-[calc(100vh-160px)] space-y-1.5 overflow-y-auto p-4">

                    <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Teaching Management
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
                                            : "border border-transparent text-slate-400 hover:border-slate-800/80 hover:bg-slate-900/80 hover:text-slate-100"
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

                                            <span>
                                                {item.name}
                                            </span>

                                        </div>


                                        {isActive ? (

                                            <ChevronRight className="h-3.5 w-3.5 text-white/70" />

                                        ) : (

                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />

                                        )}

                                    </>
                                )}

                            </NavLink>
                        );

                    })}

                </nav>

            </div>


            {/* ================= FOOTER ================= */}

            <div className="relative z-10 border-t border-slate-800/80 bg-slate-950/60 p-4 backdrop-blur-md">

                <div className="flex items-center justify-between rounded-2xl border border-slate-800/80 bg-slate-900/60 p-2.5">

                    <div className="flex min-w-0 items-center gap-2.5">

                        <div className="flex-shrink-0 rounded-xl border border-blue-500/20 bg-blue-500/10 p-2 text-blue-400">

                            <ShieldCheck className="h-4 w-4" />

                        </div>

                        <div className="min-w-0">

                            <p className="truncate text-xs font-semibold text-white">
                                Teacher Panel
                            </p>

                            <p className="truncate text-[10px] text-slate-400">
                                v2.4 System
                            </p>

                        </div>

                    </div>


                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                        title="Sign Out"
                        className="rounded-xl border border-transparent p-2 text-slate-400 transition-colors hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                    >

                        <LogOut className="h-4 w-4" />

                    </motion.button>

                </div>

            </div>

        </aside>
    );
};

export default TeacherSidebar;