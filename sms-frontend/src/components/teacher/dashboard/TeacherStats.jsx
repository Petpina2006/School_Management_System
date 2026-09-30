import React from "react";
import {
    Users,
    School,
    BookOpen,
    ClipboardCheck,
} from "lucide-react";

const TeacherStats = ({ data = {} }) => {

    const stats = [
        {
            title: "My Classes",
            value: data.total_classes ?? 0,
            description: "Classes assigned",
            icon: School,
        },
        {
            title: "My Students",
            value: data.total_students ?? 0,
            description: "Total students",
            icon: Users,
        },
        {
            title: "My Subjects",
            value: data.total_subjects ?? 0,
            description: "Teaching subjects",
            icon: BookOpen,
        },
        {
            title: "Attendance",
            value: data.total_attendance ?? 0,
            description: "Attendance records",
            icon: ClipboardCheck,
        },
    ];

    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((item, index) => {

                const Icon = item.icon;

                return (
                    <div
                        key={index}
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    {item.title}
                                </p>

                                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                                    {item.value}
                                </h3>

                            </div>

                            <div className="rounded-xl bg-indigo-50 p-3">

                                <Icon className="h-6 w-6 text-indigo-600" />

                            </div>

                        </div>

                        <p className="mt-3 text-xs text-slate-400">
                            {item.description}
                        </p>

                    </div>
                );
            })}

        </div>
    );
};

export default TeacherStats;