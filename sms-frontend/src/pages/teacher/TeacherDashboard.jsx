import React, { useEffect, useState } from "react";

import TeacherStats from "../../components/teacher/dashboard/TeacherStats";
import TeacherOverview from "../../components/teacher/dashboard/TeacherOverview";
import { getTeacherDashboard } from "../../services/teachers/teacherApi";

const TeacherDashboard = () => {

    const [data, setData] = useState({
        total_classes: 0,
        total_students: 0,
        total_subjects: 0,
        total_scores: 0,
        total_attendance: 0,
        class_data: [],
        attendance_data: [],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getTeacherDashboard();

            console.log("Teacher Dashboard API:", result);

            // Laravel response is:
            // { status, message, data }
            const dashboardData = result.data ?? {};

            console.log("Dashboard Data:", dashboardData);

            setData({
                total_classes: dashboardData.total_classes ?? 0,
                total_students: dashboardData.total_students ?? 0,
                total_subjects: dashboardData.total_subjects ?? 0,
                total_scores: dashboardData.total_scores ?? 0,
                total_attendance: dashboardData.total_attendance ?? 0,

                class_data: Array.isArray(dashboardData.class_data)
                    ? dashboardData.class_data
                    : [],

                attendance_data: Array.isArray(
                    dashboardData.attendance_data
                )
                    ? dashboardData.attendance_data
                    : [],
            });

        } catch (error) {

            console.error("Teacher Dashboard Error:", error);

            setError(
                error?.message ||
                "Failed to load teacher dashboard."
            );

        } finally {

            setLoading(false);

        }
    };

    // =========================================================
    // Loading
    // =========================================================

    if (loading) {
        return (
            <div className="flex min-h-[500px] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

                    <p className="mt-4 text-sm text-slate-500">
                        Loading teacher dashboard...
                    </p>

                </div>

            </div>
        );
    }

    // =========================================================
    // Error
    // =========================================================

    if (error) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

                <h3 className="font-bold text-red-700">
                    Dashboard Error
                </h3>

                <p className="mt-2 text-sm text-red-600">
                    {error}
                </p>

                <button
                    onClick={loadDashboard}
                    className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                    Try Again
                </button>

            </div>
        );
    }

    // =========================================================
    // Dashboard
    // =========================================================

    return (
        <div className="space-y-6">

            {/* Statistics Cards */}
            <TeacherStats data={data} />

            {/* Overview + Charts */}
            <TeacherOverview data={data} />

        </div>
    );
};

export default TeacherDashboard;