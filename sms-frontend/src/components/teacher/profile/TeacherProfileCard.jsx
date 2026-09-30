import React from "react";

export default function TeacherProfileCard({ teacher }) {
    if (!teacher) return null;

    // Resolve name fallback
    const name = teacher.Full_name || teacher.full_name || teacher.name || "N/A";
    const initial = name !== "N/A" ? name.charAt(0).toUpperCase() : "T";
    const isActive = (teacher.status || "active").toLowerCase() === "active";

    return (
        <div className="mx-auto max-w-8xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            {/* Header: Avatar, Name, Status & Actions */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6">
                <div className="flex items-center gap-4">
                    {/* Minimal Avatar */}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold text-white shadow-sm">
                        {initial}
                    </div>

                    <div>
                        <div className="flex items-center gap-2.5">
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                                {name}
                            </h2>
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                isActive 
                                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20" 
                                    : "bg-slate-100 text-slate-600"
                            }`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
                                {teacher.status || "Active"}
                            </span>
                        </div>
                        <p className="mt-0.5 text-xs font-medium text-slate-500">
                            Teacher Portal • Faculty ID: <span className="font-semibold text-slate-700">{teacher.teacher_code || "-"}</span>
                        </p>
                    </div>
                </div>

                <button className="self-start sm:self-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300">
                    Edit Profile
                </button>
            </div>

            {/* Information Grid */}
            <div className="mt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Personal & Contact Info
                </h3>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <CleanField 
                        label="Teacher Code" 
                        value={teacher.teacher_code} 
                    />
                    
                    <CleanField 
                        label="Gender" 
                        value={teacher.gender} 
                        capitalize 
                    />

                    <CleanField 
                        label="Phone Number" 
                        value={teacher.phone} 
                    />

                    <CleanField 
                        label="Email Address" 
                        value={teacher.email} 
                    />

                    <CleanField 
                        label="Residential Address" 
                        value={teacher.address} 
                        colSpan="sm:col-span-2"
                    />
                </div>
            </div>
        </div>
    );
}

function CleanField({ label, value, colSpan = "", capitalize = false }) {
    return (
        <div className={`rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 transition hover:bg-slate-50 ${colSpan}`}>
            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                {label}
            </p>
            <p className={`mt-1 text-sm font-semibold text-slate-800 ${capitalize ? "capitalize" : ""}`}>
                {value || <span className="font-normal text-slate-400">Not provided</span>}
            </p>
        </div>
    );
}