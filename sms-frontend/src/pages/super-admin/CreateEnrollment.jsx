import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  User,
  School,
  Calendar,
  Activity,
  Save,
  X,
  RefreshCw,
} from "lucide-react";

import { createEnrollment } from "../../services/enrollmentApi";
import { apiFetch } from "../../services/api";

const CreateEnrollment = () => {
  const navigate = useNavigate();

  // =========================================
  // FORM DATA
  // =========================================
  const [formData, setFormData] = useState({
    student_id: "",
    class_id: "",
    academic_year: "",
    enrollment_date: "",
    status: "active",
  });

  // =========================================
  // STATE
  // =========================================
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================
  // HANDLE CHANGE
  // =========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // FETCH STUDENTS
  // =========================================
  const fetchStudents = async () => {
    try {
      const result = await apiFetch("/super-admin/students", {
        method: "GET",
      });

      setStudents(result?.data?.data || result?.data || []);
    } catch (error) {
      console.error("Fetch Students Error:", error);
      setError(error?.message || "Failed to load students.");
    }
  };

  // =========================================
  // FETCH CLASSES
  // =========================================
  const fetchClasses = async () => {
    try {
      const result = await apiFetch("/super-admin/classes", {
        method: "GET",
      });

      setClasses(result?.data?.data || result?.data || []);
    } catch (error) {
      console.error("Fetch Classes Error:", error);
      setError(error?.message || "Failed to load classes.");
    }
  };

  // =========================================
  // LOAD DATA
  // =========================================
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      await Promise.all([fetchStudents(), fetchClasses()]);

      setLoading(false);
    };

    loadData();
  }, []);

  // =========================================
  // SUBMIT
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const result = await createEnrollment(formData);

      console.log("Create Enrollment:", result);

      if (!result?.status) {
        throw new Error(result?.message || "Failed to create enrollment");
      }

      // =========================================
      // SUCCESS
      // =========================================
      setSuccess("Enrollment created successfully.");

      // Reset form
      setFormData({
        student_id: "",
        class_id: "",
        academic_year: "",
        enrollment_date: "",
        status: "active",
      });
    } catch (error) {
      console.error("Create Enrollment Error:", error);

      setError(error?.message || "Failed to create enrollment.");
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // BACK / CANCEL
  // =========================================
  const handleCancel = () => {
    if (saving) return;

    navigate("/super-admin/enrollments");
  };

  // =========================================
  // RENDER
  // =========================================
  return (
    <div className="w-full">
      {/* =====================================
                        HEADER
                ===================================== */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          {/* Back Button */}
          <button
            type="button"
            onClick={handleCancel}
            disabled={saving}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Add New Enrollment
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Enroll a student into a class
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
                        SUCCESS
                ===================================== */}
      {success && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-600">
          {success}
        </div>
      )}

      {/* =====================================
                        ERROR
                ===================================== */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =====================================
                        FORM
                ===================================== */}
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl border border-gray-100 bg-white shadow-sm"
      >
        {/* =====================================
                            ENROLLMENT INFORMATION
                    ===================================== */}
        <div className="border-b border-gray-100 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              Enrollment Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter the student's enrollment information
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Student */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Student
              </label>

              <div className="relative">
                <User
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleChange}
                  required
                  disabled={saving || loading}
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
                >
                  <option value="">
                    {loading ? "Loading students..." : "Select Student"}
                  </option>

                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.Full_name || student.full_name} -{" "}
                      {student.student_code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Class */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Class
              </label>

              <div className="relative">
                <School
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  name="class_id"
                  value={formData.class_id}
                  onChange={handleChange}
                  required
                  disabled={saving || loading}
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
                >
                  <option value="">
                    {loading ? "Loading classes..." : "Select Class"}
                  </option>

                  {classes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.class_name} - {item.grade} {item.section}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Academic Year */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Academic Year
              </label>

              <div className="relative">
                <Calendar
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="academic_year"
                  value={formData.academic_year}
                  onChange={handleChange}
                  placeholder="e.g. 2026-2027"
                  required
                  disabled={saving}
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
                />
              </div>
            </div>

            {/* Enrollment Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Enrollment Date
              </label>

              <div className="relative">
                <Calendar
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="date"
                  name="enrollment_date"
                  value={formData.enrollment_date}
                  onChange={handleChange}
                  required
                  disabled={saving}
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>

              <div className="relative">
                <Activity
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  disabled={saving}
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
                >
                  <option value="active">Active</option>

                  <option value="completed">Completed</option>

                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
                            BUTTONS
                    ===================================== */}
        <div className="flex justify-end gap-3 p-6">
          {/* Cancel */}
          <button
            type="button"
            onClick={handleCancel}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={17} />
            Cancel
          </button>

          {/* Create */}
          <button
            type="submit"
            disabled={saving || loading}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <RefreshCw size={17} className="animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save size={17} />
                Create Enrollment
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEnrollment;
