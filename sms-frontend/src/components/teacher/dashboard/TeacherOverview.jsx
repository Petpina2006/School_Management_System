import React from "react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

const PIE_COLORS = [
    "#2563eb",
    "#ef4444",
    "#f59e0b",
    "#10b981",
];

const TeacherOverview = ({ data = {} }) => {

    const metrics = [
        {
            label: "Classes Assigned",
            value: data.total_classes ?? 0,
            target: "Active Semester",
        },
        {
            label: "Total Enrolled Students",
            value: data.total_students ?? 0,
            target: "Across all sections",
        },
        {
            label: "Teaching Subjects",
            value: data.total_subjects ?? 0,
            target: "Course Modules",
        },
    ];

    // Dynamic data from Laravel API
    const classData = data.class_data ?? [];
    const attendanceData = data.attendance_data ?? [];

    return (
        <div className="space-y-6">

            {/* =========================================================
                TOP SECTION
            ========================================================== */}

            <div className="grid gap-6 lg:grid-cols-3">

                {/* =====================================================
                    HERO WELCOME CARD
                ====================================================== */}

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 p-8 text-white shadow-md lg:col-span-2">

                    <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-10 right-20 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl" />

                    <div className="relative z-10 flex h-full flex-col justify-between space-y-6">

                        <div>

                            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-200 ring-1 ring-inset ring-indigo-400/30">
                                ✨ Portal Dashboard
                            </span>

                            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                                Welcome back, Teacher!
                            </h2>

                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-indigo-100/80">
                                Here is a quick summary of your academic portal.
                                Track your classes, grade student progress,
                                record daily attendance, and review performance
                                seamlessly.
                            </p>

                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">

                            <button
                                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white/50"
                            >
                                Mark Attendance
                            </button>

                            <button
                                className="inline-flex items-center justify-center rounded-xl bg-indigo-700/60 px-4 py-2.5 text-xs font-semibold text-white shadow-sm ring-1 ring-inset ring-white/20 transition hover:bg-indigo-700 focus:outline-none"
                            >
                                View Schedule
                            </button>

                        </div>

                    </div>
                </div>

                {/* =====================================================
                    ACADEMIC SUMMARY
                ====================================================== */}

                <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">

                    <div>

                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                            <h3 className="text-base font-bold text-slate-800">
                                Academic Summary
                            </h3>

                            <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
                                Updated Live
                            </span>

                        </div>

                        <div className="mt-4 divide-y divide-slate-100">

                            {metrics.map((item, index) => (

                                <div
                                    key={index}
                                    className="flex items-center justify-between py-3.5"
                                >

                                    <div>

                                        <p className="text-sm font-medium text-slate-700">
                                            {item.label}
                                        </p>

                                        <p className="text-xs text-slate-400">
                                            {item.target}
                                        </p>

                                    </div>

                                    <span className="rounded-lg bg-slate-50 px-3 py-1.5 text-sm font-bold text-slate-900 ring-1 ring-inset ring-slate-200/60">
                                        {item.value}
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                    <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-center text-xs text-slate-500">

                        Need help managing your portal?

                        <a
                            href="#"
                            className="ml-1 font-semibold text-indigo-600 hover:underline"
                        >
                            Contact Support
                        </a>

                    </div>

                </div>

            </div>

            {/* =========================================================
                CHART SECTION
            ========================================================== */}

            <div className="grid gap-6 lg:grid-cols-2">

                {/* =====================================================
                    BAR CHART
                ====================================================== */}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="mb-5">

                        <h3 className="text-base font-bold text-slate-800">
                            Students by Class
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                            Number of students in each class
                        </p>

                    </div>

                    <div className="h-80">

                        {classData.length === 0 ? (

                            <div className="flex h-full items-center justify-center">

                                <p className="text-sm text-slate-400">
                                    No class data available
                                </p>

                            </div>

                        ) : (

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <BarChart
                                    data={classData}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: 0,
                                        bottom: 10,
                                    }}
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        dataKey="className"
                                        tick={{
                                            fontSize: 12,
                                        }}
                                    />

                                    <YAxis />

                                    <Tooltip />

                                    <Bar
                                        dataKey="students"
                                        name="Students"
                                        fill="#4f46e5"
                                        radius={[6, 6, 0, 0]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        )}

                    </div>

                </div>

                {/* =====================================================
                    PIE CHART
                ====================================================== */}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="mb-5">

                        <h3 className="text-base font-bold text-slate-800">
                            Attendance Overview
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                            Student attendance statistics
                        </p>

                    </div>

                    <div className="h-80">

                        {attendanceData.length === 0 ? (

                            <div className="flex h-full items-center justify-center">

                                <p className="text-sm text-slate-400">
                                    No attendance data available
                                </p>

                            </div>

                        ) : (

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <PieChart>

                                    <Pie
                                        data={attendanceData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        innerRadius={55}
                                        paddingAngle={3}
                                        label
                                    >

                                        {attendanceData.map(
                                            (entry, index) => (

                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        PIE_COLORS[
                                                            index %
                                                            PIE_COLORS.length
                                                        ]
                                                    }
                                                />

                                            )
                                        )}

                                    </Pie>

                                    <Tooltip />

                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default TeacherOverview;