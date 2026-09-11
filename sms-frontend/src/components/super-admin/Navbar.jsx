import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    LogOut,
    Bell,
    Search,
    Sparkles,
    UserCheck,
    Sun,
    Moon,
    ChevronDown,
    User,
    Settings,
} from "lucide-react";

import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    // ==========================================
    // THEME
    // ==========================================

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    const [profileOpen, setProfileOpen] = useState(false);

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) =>
            prev === "light" ? "dark" : "light"
        );
    };

    // ==========================================
    // PAGE TITLE
    // ==========================================

    const getPageTitle = () => {
        const path = location.pathname;

        if (path.includes("/dashboard")) {
            return "Dashboard";
        }

        if (path.includes("/users")) {
            return "Users Management";
        }

        if (path.includes("/students")) {
            return "Students Overview";
        }

        if (path.includes("/teachers")) {
            return "Faculty & Teachers";
        }

        if (path.includes("/classes")) {
            return "Class Roster";
        }

        if (path.includes("/subjects")) {
            return "Curriculum & Subjects";
        }

        if (path.includes("/enrollments")) {
            return "Student Enrollments";
        }

        if (path.includes("/scores")) {
            return "Gradebook & Scores";
        }

        if (path.includes("/attendance")) {
            return "Daily Attendance";
        }

        return "Super Admin Portal";
    };

    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    // ==========================================
    // RENDER
    // ==========================================

    return (
        <header className="
        fixed
        top-0
        right-0
        left-64
        z-50
        flex
        h-16
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white/95
        px-6
        shadow-sm
        backdrop-blur-md
        dark:border-slate-800
        dark:bg-slate-950/95
    ">

            {/* =====================================
                LEFT
            ====================================== */}

            <div className=" flex items-center gap-3">

                <div className="h-6 w-1 rounded-full bg-blue-600" />

                <div>

                    <div className="flex items-center gap-2">

                        <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                            {getPageTitle()}
                        </h1>

                        <span className="hidden items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 sm:inline-flex">

                            <Sparkles className="h-3 w-3" />

                            Live

                        </span>

                    </div>

                </div>

            </div>


            {/* =====================================
                RIGHT
            ====================================== */}

            <div className="flex items-center gap-3">

                {/* SEARCH */}

                <button
                    type="button"
                    className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-100/70 px-3 py-1.5 text-xs text-slate-500 transition hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 md:flex"
                >

                    <Search className="h-3.5 w-3.5" />

                    <span>
                        Search portal...
                    </span>

                    <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-400 dark:border-slate-700 dark:bg-slate-800">
                        ⌘K
                    </kbd>

                </button>


                {/* THEME */}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTheme}
                    type="button"
                    title={`Switch to ${
                        theme === "light"
                            ? "Dark"
                            : "Light"
                    } Mode`}
                    className="rounded-lg border border-slate-200 bg-slate-100 p-2 text-slate-600 transition-colors hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white"
                >

                    {theme === "light" ? (
                        <Moon className="h-4 w-4" />
                    ) : (
                        <Sun className="h-4 w-4 text-amber-400" />
                    )}

                </motion.button>


                {/* NOTIFICATION */}

                <button
                    type="button"
                    className="relative rounded-lg border border-slate-200 bg-slate-100 p-2 text-slate-600 transition-colors hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white"
                    title="Notifications"
                >

                    <Bell className="h-4 w-4" />

                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white dark:bg-blue-500 dark:ring-slate-950" />

                </button>


                {/* PROFILE */}

                <div className="relative border-l border-slate-200 pl-3 dark:border-slate-800">

                    <button
                        type="button"
                        onClick={() =>
                            setProfileOpen(!profileOpen)
                        }
                        className="flex items-center gap-3 rounded-lg p-1.5 transition hover:bg-slate-100 dark:hover:bg-slate-900"
                    >

                        {/* Avatar */}

                        <div className="relative">

                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-xs font-bold text-white shadow-sm">

                                {user?.name
                                    ? user.name
                                          .charAt(0)
                                          .toUpperCase()
                                    : "A"}

                            </div>

                            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-950" />

                        </div>


                        {/* User Info */}

                        <div className="hidden text-left sm:block">

                            <p className="text-xs font-semibold leading-tight text-slate-900 dark:text-slate-100">
                                {user?.name || "Super Admin"}
                            </p>

                            <p className="mt-0.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">

                                <UserCheck className="h-2.5 w-2.5" />

                                {user?.role || "super_admin"}

                            </p>

                        </div>

                        <ChevronDown
                            className={`hidden h-4 w-4 text-slate-400 transition-transform sm:block ${
                                profileOpen
                                    ? "rotate-180"
                                    : ""
                            }`}
                        />

                    </button>


                    {/* =================================
                        PROFILE DROPDOWN
                    ================================== */}

                    {profileOpen && (
                        <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">

                            <div className="border-b border-slate-200 p-4 dark:border-slate-800">

                                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                    {user?.name || "Super Admin"}
                                </p>

                                <p className="mt-1 truncate text-xs text-slate-500">
                                    {user?.email || "admin@example.com"}
                                </p>

                            </div>


                            <div className="p-2">

                                <button
                                    onClick={() => {
                                        setProfileOpen(false);
                                        navigate(
                                            "/super-admin/profile"
                                        );
                                    }}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                                >

                                    <User className="h-4 w-4" />

                                    My Profile

                                </button>


                                <button
                                    onClick={() => {
                                        setProfileOpen(false);
                                        navigate(
                                            "/super-admin/settings"
                                        );
                                    }}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                                >

                                    <Settings className="h-4 w-4" />

                                    Settings

                                </button>


                                <div className="my-1 border-t border-slate-200 dark:border-slate-800" />


                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                                >

                                    <LogOut className="h-4 w-4" />

                                    Logout

                                </button>

                            </div>

                        </div>
                    )}

                </div>

            </div>

        </header>
    );
};

export default Navbar;