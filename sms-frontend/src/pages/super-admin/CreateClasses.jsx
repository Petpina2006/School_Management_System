import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Save,
  School,
  GraduationCap,
  DoorOpen,
  Calendar,
  User,
  Users,
  AlertCircle,
  Eye,
} from "lucide-react";

import { createClass } from "../../services/classApi";
import { getTeachers } from "../../services/teacherApi";

const CreateClasses = () => {
  const navigate = useNavigate();

  // ==============================
  // FORM DATA
  // ==============================
  const initialFormData = {
    class_name: "",
    grade: "",
    section: "",
    room: "",
    academic_year: "",
    teacher_id: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  // ==============================
  // STATE
  // ==============================
  const [teachers, setTeachers] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==============================
  // LOAD TEACHERS
  // ==============================
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoadingTeachers(true);

        const response = await getTeachers();

        console.log("Teachers API:", response);

        // Handle various response wrappers from backend
        if (Array.isArray(response?.data)) {
          setTeachers(response.data);
        } else if (Array.isArray(response?.data?.data)) {
          setTeachers(response.data.data);
        } else if (Array.isArray(response)) {
          setTeachers(response);
        } else {
          setTeachers([]);
        }
      } catch (err) {
        console.error("Failed to load teachers:", err);

        setTeachers([]);
        setError("Failed to load teachers.");
      } finally {
        setLoadingTeachers(false);
      }
    };

    fetchTeachers();
  }, []);

  // ==============================
  // HANDLE CHANGE
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
    if (success) setSuccess("");
  };

  // Get currently selected teacher object for preview
  const selectedTeacher = teachers.find(
    (t) => String(t.id) === String(formData.teacher_id)
  );

  // ==============================
  // SUBMIT
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        class_name: formData.class_name,
        grade: formData.grade,
        section: formData.section,
        room: formData.room,
        academic_year: formData.academic_year,
        // Convert to integer if selected, otherwise fallback to null instead of 0
        teacher_id: formData.teacher_id ? parseInt(formData.teacher_id, 10) : null,
      };

      console.log("Create Class Payload:", payload);

      await createClass(payload);

      setSuccess("Class created successfully.");

      // Reset form
      setFormData(initialFormData);
    } catch (err) {
      console.error("Create Class Error:", err);

      // Handle Laravel validation error object
      if (err?.response?.data?.errors) {
        const validationErrors = err.response.data.errors;
        const firstError = Object.values(validationErrors).flat().find(Boolean);
        setError(firstError || "Please check your information and try again.");
      } else {
        setError(
          err?.response?.data?.message || err?.message || "Failed to create class."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // INPUT STYLES
  // ==============================
  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

  return (
    <div className="mx-auto max-w-8xl space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/super-admin/classes")}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <ArrowLeft size={20} />
            </button>

            <h1 className="text-2xl font-bold text-gray-900">Create Class</h1>
          </div>

          <p className="ml-11 text-sm text-gray-500">
            Add a new class to the school management system.
          </p>
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <span className="font-medium">✓</span>
          {success}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
      >
        {/* CLASS INFORMATION */}
        <div className="border-b border-gray-100 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <School size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">Class Information</h2>
              <p className="text-sm text-gray-500">
                Enter the basic information about the class.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Class Name */}
            <div>
              <label className={labelClass}>Class Name</label>
              <div className="relative">
                <School
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="class_name"
                  value={formData.class_name}
                  onChange={handleChange}
                  placeholder="e.g. Class 10A"
                  required
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            {/* Grade */}
            <div>
              <label className={labelClass}>Grade</label>
              <div className="relative">
                <GraduationCap
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  required
                  className={`${inputClass} appearance-none pl-10`}
                >
                  <option value="">Select Grade</option>
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                </select>
              </div>
            </div>

            {/* Section */}
            <div>
              <label className={labelClass}>Section</label>
              <div className="relative">
                <Users
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  required
                  className={`${inputClass} appearance-none pl-10`}
                >
                  <option value="">Select Section</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                </select>
              </div>
            </div>

            {/* Room */}
            <div>
              <label className={labelClass}>Room</label>
              <div className="relative">
                <DoorOpen
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  placeholder="e.g. Room 101"
                  required
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ACADEMIC INFORMATION */}
        <div className="border-b border-gray-100 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
              <Calendar size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Academic Information
              </h2>
              <p className="text-sm text-gray-500">
                Enter the academic year and assigned teacher.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Academic Year */}
            <div>
              <label className={labelClass}>Academic Year</label>
              <div className="relative">
                <Calendar
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="academic_year"
                  value={formData.academic_year}
                  onChange={handleChange}
                  placeholder="e.g. 2025/2026"
                  required
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            {/* Teacher Selection */}
            <div>
              <label className={labelClass}>Teacher</label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  name="teacher_id"
                  value={formData.teacher_id}
                  onChange={handleChange}
                  required
                  disabled={loadingTeachers}
                  className={`${inputClass} appearance-none pl-10 disabled:cursor-not-allowed disabled:bg-gray-100`}
                >
                  <option value="">
                    {loadingTeachers
                      ? "Loading teachers..."
                      : "Select Teacher"}
                  </option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.teacher_code
                        ? `${teacher.teacher_code} - `
                        : ""}
                      {teacher.first_name} {teacher.last_name}
                    </option>
                  ))}
                </select>
              </div>

              {!loadingTeachers && teachers.length === 0 && (
                <p className="mt-2 text-sm text-red-500">No teachers found.</p>
              )}

              {!loadingTeachers && teachers.length > 0 && (
                <p className="mt-2 text-xs text-gray-400">
                  {teachers.length} teacher
                  {teachers.length > 1 ? "s" : ""} available
                </p>
              )}
            </div>
          </div>
        </div>

        {/* LIVE PREVIEW SECTION */}
        <div className="border-b border-gray-100 bg-gray-50/50 p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Eye size={18} className="text-gray-500" />
            <span>Class Preview</span>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <div>
                <span className="text-xs text-gray-400">Class Name</span>
                <p className="font-semibold text-gray-800">
                  {formData.class_name || "—"}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-400">Grade & Section</span>
                <p className="font-semibold text-gray-800">
                  {formData.grade || "—"}{" "}
                  {formData.section ? `- ${formData.section}` : ""}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-400">Room</span>
                <p className="font-semibold text-gray-800">
                  {formData.room || "—"}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-400">Assigned Teacher</span>
                <p className="font-semibold text-blue-600">
                  {selectedTeacher
                    ? `${selectedTeacher.first_name} ${selectedTeacher.last_name}`
                    : "No Teacher Selected"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 p-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/super-admin/classes")}
            disabled={saving}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving || loadingTeachers}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating...
              </>
            ) : (
              <>
                <Save size={18} />
                Create Class
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClasses;