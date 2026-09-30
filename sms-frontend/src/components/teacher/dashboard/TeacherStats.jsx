import React from "react";

export function TeacherStats({ stats = {} }) {
    const items = [
        {
            title: "Total Classes",
            value: stats.total_classes ?? 0,
            subtitle: "Active assigned classes",
            icon: (
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0H9m1 0h1" />
                </svg>
            ),
            bgColor: "bg-blue-50",
            borderColor: "border-blue-100",
        },
        {
            title: "Total Students",
            value: stats.total_students ?? 0,
            subtitle: "Enrolled across classes",
            icon: (
                <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
            ),
            bgColor: "bg-emerald-50",
            borderColor: "border-emerald-100",
        },
        {
            title: "Subjects Handled",
            value: stats.total_subjects ?? 0,
            subtitle: "Curriculum modules",
            icon: (
                <svg className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            bgColor: "bg-violet-50",
            borderColor: "border-violet-100",
        },
        {
            title: "Attendance Recorded",
            value: stats.total_attendance ?? 0,
            subtitle: "Sessions logged",
            icon: (
                <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 0v4m-9 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            bgColor: "bg-amber-50",
            borderColor: "border-amber-100",
        },
    ];

    return (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => (
                <div
                    key={item.title}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                {item.title}
                            </p>
                            <h3 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
                                {item.value.toLocaleString()}
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                                {item.subtitle}
                            </p>
                        </div>

                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bgColor} ${item.borderColor} border transition-transform duration-200 group-hover:scale-105`}>
                            {item.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TeacherStats;