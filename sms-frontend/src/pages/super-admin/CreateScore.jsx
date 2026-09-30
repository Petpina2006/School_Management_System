import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

import { createScore } from "../../services/scoreApi";
import { apiFetch } from "../../services/api";

const CreateScore = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    student_id: "",
    subject_id: "",
    class_id: "",
    teacher_id: "",
    exam_type: "",
    score: "",
    max_score: "100",
    exam_date: "",
    remark: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const normalizeData = (result) => {
    return result?.data?.data || result?.data || [];
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [studentResult, subjectResult, classResult, teacherResult] =
        await Promise.all([
          apiFetch("/super-admin/students"),
          apiFetch("/super-admin/subjects"),
          apiFetch("/super-admin/classes"),
          apiFetch("/super-admin/teachers"),
        ]);

      setStudents(normalizeData(studentResult));
      setSubjects(normalizeData(subjectResult));
      setClasses(normalizeData(classResult));
      setTeachers(normalizeData(teacherResult));
    } catch (err) {
      setError(err.response?.message || err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await createScore({
        ...formData,
        student_id: Number(formData.student_id),
        subject_id: Number(formData.subject_id),
        class_id: Number(formData.class_id),
        teacher_id: Number(formData.teacher_id),
        score: Number(formData.score),
        max_score: formData.max_score ? Number(formData.max_score) : null,
      });

      setSuccess("Score created successfully.");

    //   setTimeout(() => {
    //     navigate("/super-admin/scores");
    //   }, 800);
    } catch (err) {
      setError(
        err.response?.message || err.message || "Failed to create score",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/super-admin/scores")}
          className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create Score</h1>

          <p className="mt-1 text-sm text-gray-500">Add a new student score</p>
        </div>
      </div>

      {success && (
        <div className="mb-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Student
            </label>

            <select
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select Student</option>

              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.Full_name || student.full_name || student.name}{" "}
                  {student.student_code ? `(${student.student_code})` : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Subject
            </label>

            <select
              name="subject_id"
              value={formData.subject_id}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select Subject</option>

              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.subject_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Class
            </label>

            <select
              name="class_id"
              value={formData.class_id}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select Class</option>

              {classes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.class_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Teacher
            </label>

            <select
              name="teacher_id"
              value={formData.teacher_id}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select Teacher</option>

              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.Full_name || teacher.full_name || teacher.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Exam Type
            </label>

            <select
              name="exam_type"
              value={formData.exam_type}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select Exam Type</option>
              <option value="quiz">Quiz</option>
              <option value="assignment">Assignment</option>
              <option value="midterm">Midterm</option>
              <option value="final">Final</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Exam Date
            </label>

            <input
              type="date"
              name="exam_date"
              value={formData.exam_date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Score
            </label>

            <input
              type="number"
              name="score"
              value={formData.score}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              placeholder="Enter score"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Max Score
            </label>

            <input
              type="number"
              name="max_score"
              value={formData.max_score}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="100"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Remark
            </label>

            <textarea
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              rows="4"
              placeholder="Enter remark..."
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
          <button
            type="button"
            onClick={() => navigate("/super-admin/scores")}
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={17} />

            {saving ? "Saving..." : "Create Score"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateScore;
