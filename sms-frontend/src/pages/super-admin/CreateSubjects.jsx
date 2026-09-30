import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  BookOpen,
  Hash,
  FileText,
  Activity,
  AlertCircle,
} from "lucide-react";

import { createSubject } from "../../services/subjectApi";

const CreateSubjects = () => {
  const navigate = useNavigate();

  // ==============================
  // FORM DATA
  // ==============================
  const initialFormData = {
    subject_code: "",
    subject_name: "",
    description: "",
    status: "active",
  };

  const [formData, setFormData] = useState(initialFormData);

  // ==============================
  // STATE
  // ==============================
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==============================
  // HANDLE CHANGE
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear messages when user changes input
    if (error) setError("");
    if (success) setSuccess("");
  };

  // ==============================
  // SUBMIT
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      console.log("Create Subject Payload:", formData);

      await createSubject(formData);

      setSuccess("Subject created successfully.");

      // Reset form
      setFormData(initialFormData);
    } catch (err) {
      console.error("Create Subject Error:", err);

      // Laravel validation errors
      if (err?.response?.errors) {
        const validationErrors = err.response.errors;
        const firstError = Object.values(validationErrors).flat().find(Boolean);

        setError(firstError || "Please check your information and try again.");
      } else {
        setError(
          err?.response?.message ||
            err?.message ||
            "Failed to create subject.",
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
      {/* ==============================
          HEADER
      ============================== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/super-admin/subjects")}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <ArrowLeft size={20} />
            </button>

            <h1 className="text-2xl font-bold text-gray-900">Create Subject</h1>
          </div>

          <p className="ml-11 text-sm text-gray-500">
            Add a new subject to the school management system.
          </p>
        </div>
      </div>

      {/* ==============================
          SUCCESS ALERT
      ============================== */}
      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <span className="font-medium">✓</span>
          {success}
        </div>
      )}

      {/* ==============================
          ERROR ALERT
      ============================== */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* ==============================
          FORM CARD
      ============================== */}
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
      >
        {/* ==============================
            SUBJECT INFORMATION
        ============================== */}
        <div className="border-b border-gray-100 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <BookOpen size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Subject Information
              </h2>

              <p className="text-sm text-gray-500">
                Enter the basic information about the subject.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Subject Code */}
            <div>
              <label className={labelClass}>
                Subject Code <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Hash
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="subject_code"
                  value={formData.subject_code}
                  onChange={handleChange}
                  placeholder="e.g. MATH001"
                  required
                  className={`${inputClass} pl-10 uppercase placeholder:normal-case`}
                />
              </div>

              <p className="mt-1.5 text-xs text-gray-400">
                Enter a unique code for this subject.
              </p>
            </div>

            {/* Subject Name */}
            <div>
              <label className={labelClass}>
                Subject Name <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <BookOpen
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="subject_name"
                  value={formData.subject_name}
                  onChange={handleChange}
                  placeholder="e.g. Mathematics"
                  required
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className={labelClass}>
                Status <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Activity
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className={`${inputClass} appearance-none pl-10`}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>

              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter subject description..."
                  rows={4}
                  className={`${inputClass} resize-none pl-10 placeholder:text-gray-400`}
                />
              </div>

              <p className="mt-1.5 text-xs text-gray-400">
                Optional detailed description for this subject.
              </p>
            </div>
          </div>
        </div>

        {/* ==============================
            BUTTONS
        ============================== */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 p-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/super-admin/subjects")}
            disabled={saving}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
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
                Create Subject
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubjects;