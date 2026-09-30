import React from "react";

export function TeacherOverview({ data = {} }) {
    const metrics = [
        { label: "Classes Assigned", value: data.total_classes ?? 0, target: "Active Semester" },
        { label: "Total Enrolled Students", value: data.total_students ?? 0, target: "Across all sections" },
        { label: "Teaching Subjects", value: data.total_subjects ?? 0, target: "Course Modules" },
    ];

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            {/* Hero Welcome Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 p-8 text-white shadow-md lg:col-span-2">
                {/* Decorative background glow */}
                <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 right-20 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                    <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-200 ring-1 ring-inset ring-indigo-400/30">
                            ✨ Portal Dashboard
                        </span>
                        <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl text-white">
                            Welcome back, Teacher!
                        </h2>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-indigo-100/80">
                            Here is a quick summary of your academic portal. Track your classes, grade student progress, record daily attendance, and review performance seamlessly.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                        <button className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white/50">
                            Mark Attendance
                        </button>
                        <button className="inline-flex items-center justify-center rounded-xl bg-indigo-700/60 px-4 py-2.5 text-xs font-semibold text-white shadow-sm ring-1 ring-inset ring-white/20 transition hover:bg-indigo-700 focus:outline-none">
                            View Schedule
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Metrics Breakout */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
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
                            <div key={index} className="flex items-center justify-between py-3.5">
                                <div>
                                    <p className="text-sm font-medium text-slate-700">{item.label}</p>
                                    <p className="text-xs text-slate-400">{item.target}</p>
                                </div>
                                <span className="rounded-lg bg-slate-50 px-3 py-1.5 text-sm font-bold text-slate-900 ring-1 ring-inset ring-slate-200/60">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 rounded-xl bg-slate-50 p-3.5 text-center text-xs text-slate-500 border border-slate-100">
                    Need help managing your portal? <a href="#" className="font-semibold text-indigo-600 hover:underline">Contact Support</a>
                </div>
            </div>
        </div>
    );
}

export default TeacherOverview;