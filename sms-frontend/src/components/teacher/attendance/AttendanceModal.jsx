import { useState } from "react";

export default function AttendanceModal({ students = [], onClose, onSubmit }) {
  const [form, setForm] = useState({
    student_id: "",
    date: new Date().toISOString().split("T")[0],
    status: "present",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex justify-between">
          <h2 className="text-xl font-bold">Mark Attendance</h2>

          <button onClick={onClose} className="text-xl text-slate-400">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="student_id"
            value={form.student_id}
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-4 py-3"
          >
            <option value="">Select Student</option>

            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.Full_name || student.full_name || student.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-4 py-3"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          >
            <option value="present">Present</option>

            <option value="absent">Absent</option>

            <option value="late">Late</option>

            <option value="leave">Leave</option>
          </select>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
