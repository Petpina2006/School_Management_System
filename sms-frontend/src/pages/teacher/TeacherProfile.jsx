import React, { useEffect, useState } from "react";
import TeacherProfileCard from "../../components/teacher/profile/TeacherProfileCard";
import { getTeacherProfile } from "../../services/teachers/teacherApi";

export default function TeacherProfile() {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getTeacherProfile();
        setTeacher(response?.data ?? response);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile parameters.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <div className="mx-auto max-w-8xl space-y-8 p-4 sm:p-6 ">
      {/* Header Title */}
      <div className="border-b border-slate-200/60 pb-5">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          My Account Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage and review your institutional credentials and contact
          information.
        </p>
      </div>

      {loading ? (
        /* Skeleton Loader */
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse space-y-6">
          <div className="h-32 rounded-2xl bg-slate-200" />
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-2xl bg-slate-200" />
            <div className="space-y-2">
              <div className="h-6 w-48 rounded bg-slate-200" />
              <div className="h-4 w-24 rounded bg-slate-200" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-slate-100" />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
          <p className="text-sm font-semibold">{error}</p>
        </div>
      ) : (
        <TeacherProfileCard teacher={teacher} />
      )}
    </div>
  );
}
