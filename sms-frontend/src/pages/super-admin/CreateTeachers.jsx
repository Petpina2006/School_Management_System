import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UserPlus,
  Save,
  User,
  Hash,
  Calendar,
  Phone,
  MapPin,
  BookOpen,
  Activity,
} from "lucide-react";

import { createTeacher } from "../../services/teacherApi";

const CreateTeachers = () => {
  const navigate = useNavigate();

  // FORM DATA
  const initialFormData = {
    teacher_code: "",
    first_name: "",
    last_name: "",
    gender: "male",
    date_of_birth: "",
    phone: "",
    address: "",
    hire_date: "",
    specialization: "",
    status: "active",
  };

  const [formData, setFormData] = useState(initialFormData);

  // STATE
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await createTeacher(formData);

      setSuccess("Teacher created successfully.");

      // Reset form
      setFormData(initialFormData);
    } catch (err) {
      console.error("Create Teacher Error:", err);

      // Laravel validation errors
      if (err?.response?.errors) {
        const validationErrors = err.response.errors;

        const firstError = Object.values(validationErrors).flat().find(Boolean);

        setError(firstError || "Please check your information and try again.");
      } else {
        setError(
          err?.response?.message || err?.message || "Failed to create teacher.",
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // INPUT STYLE
  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

  return (
    <div className="mx-auto max-w-8xl space-y-6">
      {/*
                HEADER
         */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/super-admin/teachers")}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <ArrowLeft size={20} />
            </button>

            <h1 className="text-2xl font-bold text-gray-900">Create Teacher</h1>
          </div>

          <p className="ml-11 text-sm text-gray-500">
            Add a new teacher to the school management system.
          </p>
        </div>
      </div>

      {/*SUCCESS*/}
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

                {/* ERROR */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

                {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
      >
        {/*
                    BASIC INFORMATION
             */}
        <div className="border-b border-gray-100 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <User size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">Basic Information</h2>

              <p className="text-sm text-gray-500">
                Enter the teacher's personal information.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Teacher Code */}
            <div>
              <label className={labelClass}>Teacher Code</label>

              <div className="relative">
                <Hash
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="teacher_code"
                  value={formData.teacher_code}
                  onChange={handleChange}
                  placeholder="e.g. TCH001"
                  required
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className={labelClass}>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="male">Male</option>

                <option value="female">Female</option>
              </select>
            </div>

            {/* First Name */}
            <div>
              <label className={labelClass}>First Name</label>

              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter first name"
                required
                className={inputClass}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className={labelClass}>Last Name</label>

              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter last name"
                required
                className={inputClass}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className={labelClass}>Date of Birth</label>

              <div className="relative">
                <Calendar
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>Phone</label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>
          </div>
        </div>

        {/*
                    WORK INFORMATION
             */}
        <div className="border-b border-gray-100 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
              <BookOpen size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">Work Information</h2>

              <p className="text-sm text-gray-500">
                Enter the teacher's professional information.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Hire Date */}
            <div>
              <label className={labelClass}>Hire Date</label>

              <div className="relative">
                <Calendar
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="date"
                  name="hire_date"
                  value={formData.hire_date}
                  onChange={handleChange}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            {/* Specialization */}
            <div>
              <label className={labelClass}>Specialization</label>

              <div className="relative">
                <BookOpen
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="e.g. Mathematics"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className={labelClass}>Status</label>

              <div className="relative">
                <Activity
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`${inputClass} pl-10`}
                >
                  <option value="active">Active</option>

                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/*
                    CONTACT INFORMATION
             */}
        <div className="p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-green-50 p-2 text-green-600">
              <MapPin size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Contact Information
              </h2>

              <p className="text-sm text-gray-500">
                Enter the teacher's address.
              </p>
            </div>
          </div>

          <div>
            <label className={labelClass}>Address</label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              rows={4}
              className={inputClass}
            />
          </div>
        </div>

        {/*
                    BUTTONS
             */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 p-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/super-admin/teachers")}
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
                Create Teacher
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeachers;
