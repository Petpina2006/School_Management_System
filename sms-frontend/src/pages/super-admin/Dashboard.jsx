import { useEffect, useState } from "react";
import {
  Users,
  GraduationCap,
  UserRoundCheck,
  School,
  BookOpen,
  ClipboardList,
  ClipboardCheck,
  Award,
  TrendingUp,
  RefreshCw,
  UserPlus,
  CalendarDays,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getSuperAdminDashboard } from "../../services/superAdminApi";
import Charts from "../../components/super-admin/Charts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH DASHBOARD
  // =====================================================
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getSuperAdminDashboard();

      console.log("Dashboard:", result);

      if (!result?.status) {
        throw new Error(result?.message || "Failed to fetch dashboard");
      }

      setDashboard(result.data);
    } catch (err) {
      console.error("Dashboard Error:", err);

      setError(err?.message || "Something went wrong while loading dashboard");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // USE EFFECT
  // =====================================================
  useEffect(() => {
    fetchDashboard();
  }, []);

  // =====================================================
  // LOADING
  // =====================================================
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw size={30} className="animate-spin text-blue-600" />

          <p className="text-sm text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-semibold text-red-700">
              Failed to load dashboard
            </h2>

            <p className="mt-1 text-sm text-red-500">{error}</p>
          </div>

          <button
            onClick={fetchDashboard}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // STATISTICS CARDS
  // =====================================================

  const cards = [
    {
      title: "Total Users",
      value: dashboard?.total_users ?? 0,
      icon: Users,
      description: "All system users",
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Students",
      value: dashboard?.total_students ?? 0,
      icon: GraduationCap,
      description: "Registered students",
      bg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Total Teachers",
      value: dashboard?.total_teachers ?? 0,
      icon: UserRoundCheck,
      description: "Registered teachers",
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Classes",
      value: dashboard?.total_classes ?? 0,
      icon: School,
      description: "School classes",
      bg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Total Subjects",
      value: dashboard?.total_subjects ?? 0,
      icon: BookOpen,
      description: "Available subjects",
      bg: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      title: "Total Enrollments",
      value: dashboard?.total_enrollments ?? 0,
      icon: ClipboardList,
      description: "Student enrollments",
      bg: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* =================================================
                HEADER
            ================================================= */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Super Admin Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Overview of your school management system
          </p>
        </div>

        <button
          onClick={fetchDashboard}
          className="flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      {/* =================================================
                WELCOME CARD
            ================================================= */}

      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-sm">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-100">
              Welcome back, Super Admin 👋
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              School Management System
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">
              Manage users, students, teachers, classes, subjects, enrollments
              and school activities from one place.
            </p>
          </div>

          <div className="hidden rounded-2xl bg-white/10 p-5 md:block">
            <School size={55} />
          </div>
        </div>
      </div>

      {/* =================================================
                STATISTICS
            ================================================= */}

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              System Overview
            </h2>

            <p className="text-sm text-gray-500">Current statistics</p>
          </div>

          <Activity size={20} className="text-gray-400" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {card.title}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-gray-800">
                      {card.value}
                    </h3>
                  </div>

                  <div className={`rounded-xl p-3 ${card.bg}`}>
                    <Icon size={25} className={card.iconColor} />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                  <TrendingUp size={14} className="text-emerald-500" />

                  <span>{card.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =================================================
                SECONDARY STATISTICS
            ================================================= */}

      {/* <Charts/> */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Scores */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-yellow-100 p-3">
              <Award size={24} className="text-yellow-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Scores</p>

              <h3 className="text-2xl font-bold text-gray-800">
                {dashboard?.total_scores ?? 0}
              </h3>
            </div>
          </div>
        </div>

        {/* Attendance */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-100 p-3">
              <ClipboardCheck size={24} className="text-green-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Attendance</p>

              <h3 className="text-2xl font-bold text-gray-800">
                {dashboard?.total_attendance ?? 0}
              </h3>
            </div>
          </div>
        </div>

        {/* Active Users */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-100 p-3">
              <UserRoundCheck size={24} className="text-indigo-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Active Users</p>

              <h3 className="text-2xl font-bold text-gray-800">
                {dashboard?.active_users ?? 0}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
                QUICK ACTIONS
            ================================================= */}

      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Add User */}
          <button
            type="button"
            onClick={() => navigate("/super-admin/users/create")}
            className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:border-blue-200 hover:shadow-md"
          >
            <div className="rounded-lg bg-blue-100 p-3">
              <UserPlus size={21} className="text-blue-600" />
            </div>

            <div>
              <p className="font-semibold text-gray-800">Add User</p>

              <p className="text-xs text-gray-500">Create new account</p>
            </div>
          </button>

          {/* Add Student */}
          <button
            type="button"
            onClick={() => navigate("/super-admin/students/create")}
            className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:border-emerald-200 hover:shadow-md"
          >
            <div className="rounded-lg bg-emerald-100 p-3">
              <GraduationCap size={21} className="text-emerald-600" />
            </div>

            <div>
              <p className="font-semibold text-gray-800">Add Student</p>

              <p className="text-xs text-gray-500">Register student</p>
            </div>
          </button>

          {/* Add Teacher */}
          <button
            type="button"
            onClick={() => navigate("/super-admin/teachers/create")}
            className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:border-purple-200 hover:shadow-md"
          >
            <div className="rounded-lg bg-purple-100 p-3">
              <UserRoundCheck size={21} className="text-purple-600" />
            </div>

            <div>
              <p className="font-semibold text-gray-800">Add Teacher</p>

              <p className="text-xs text-gray-500">Register teacher</p>
            </div>
          </button>

          {/* Manage Classes */}
          <button
            type="button"
            onClick={() => navigate("/super-admin/classes")}
            className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:border-orange-200 hover:shadow-md"
          >
            <div className="rounded-lg bg-orange-100 p-3">
              <CalendarDays size={21} className="text-orange-600" />
            </div>

            <div>
              <p className="font-semibold text-gray-800">Manage Classes</p>

              <p className="text-xs text-gray-500">View school classes</p>
            </div>
          </button>
        </div>
      </div>

      {/* =================================================
                SYSTEM SUMMARY
            ================================================= */}

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-800">
            System Summary
          </h2>

          <p className="text-sm text-gray-500">
            Overview of the current school system
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          <div>
            <p className="text-sm text-gray-500">Users</p>

            <p className="mt-1 text-xl font-bold text-gray-800">
              {dashboard?.total_users ?? 0}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Students</p>

            <p className="mt-1 text-xl font-bold text-gray-800">
              {dashboard?.total_students ?? 0}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Teachers</p>

            <p className="mt-1 text-xl font-bold text-gray-800">
              {dashboard?.total_teachers ?? 0}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Classes</p>

            <p className="mt-1 text-xl font-bold text-gray-800">
              {dashboard?.total_classes ?? 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
