import { useState } from "react";

export default function ScoreModal({
  students = [],
  subjects = [],
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState({
    student_id: "",
    subject_id: "",
    score: "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      await onSubmit(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Add Score</h2>

          <button
            onClick={onClose}
            className="text-xl text-slate-400 hover:text-slate-700"
          >
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

          <select
            name="subject_id"
            value={form.subject_id}
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-4 py-3"
          >
            <option value="">Select Subject</option>

            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.subject_name || subject.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="score"
            min="0"
            max="100"
            value={form.score}
            onChange={handleChange}
            placeholder="Score 0 - 100"
            required
            className="w-full rounded-xl border px-4 py-3"
          />

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
              disabled={saving}
              className="rounded-xl bg-blue-600 px-5 py-3 text-white disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Score"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
