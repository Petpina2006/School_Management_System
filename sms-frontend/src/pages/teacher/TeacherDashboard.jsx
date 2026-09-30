
import React, { useEffect, useState } from "react";
import TeacherStats from "../../components/teacher/dashboard/TeacherStats";
import TeacherOverview from "../../components/teacher/dashboard/TeacherOverview";
import { getTeacherDashboard } from "../../services/teachers/teacherApi";

export default function TeacherDashboard() {
    const [dashboard, setDashboard] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const response = await getTeacherDashboard();
                setDashboard(response?.data ?? response);
            } catch (err) {
                console.error(err);
                setError("Failed to load dashboard statistics. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[450px] flex-col items-center justify-center space-y-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
                <p className="text-sm font-medium text-slate-500">Preparing your dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto my-6 max-w-xl rounded-2xl border border-red-200 bg-red-50/70 p-6 text-center text-red-700 shadow-sm">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                    ⚠️️
                </div>
                <h3 className="text-base font-semibold">Unable to Load Portal</h3>
                <p className="mt-1 text-sm text-red-600/90">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
                >
                    Retry Loading
                </button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-8xl space-y-8 p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <div className="flex flex-col gap-1 border-b border-slate-200/60 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                        Teacher Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Monitor active classes, student counts, and overall portal activities.
                    </p>
                </div>

                <div className="mt-4 sm:mt-0 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        System Active
                    </span>
                </div>
            </div>

            {/* Overview / Banner Section */}
            <TeacherOverview data={dashboard} />

            {/* Metric Cards Section */}
            <TeacherStats stats={dashboard} />
        </div>
    );
}