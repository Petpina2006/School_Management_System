import {
  X,
  User,
  BookOpen,
  School,
  GraduationCap,
  Calendar,
  Award,
  Pencil,
  Trash2,
  Save,
} from "lucide-react";

const ScoreModal = ({
  open,
  mode,
  score,
  formData,
  students,
  subjects,
  classes,
  teachers,
  onClose,
  onChange,
  onSubmit,
  onEdit,
  onDelete,
  saving,
}) => {
  if (!open) {
    return null;
  }

  const getStudentName = (id) => {
    const student = students.find((item) => String(item.id) === String(id));

    return (
      student?.Full_name ||
      student?.full_name ||
      student?.name ||
      `Student #${id}`
    );
  };

  const getSubjectName = (id) => {
    const subject = subjects.find((item) => String(item.id) === String(id));

    return subject?.subject_name || `Subject #${id}`;
  };

  const getClassName = (id) => {
    const item = classes.find((item) => String(item.id) === String(id));

    return item?.class_name || `Class #${id}`;
  };

  const getTeacherName = (id) => {
    const teacher = teachers.find((item) => String(item.id) === String(id));

    return (
      teacher?.Full_name ||
      teacher?.full_name ||
      teacher?.name ||
      `Teacher #${id}`
    );
  };

  const percentage =
    score && Number(score.max_score || 100) > 0
      ? (
          (Number(score.score || 0) / Number(score.max_score || 100)) *
          100
        ).toFixed(1)
      : 0;

  if (mode === "delete") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Delete Score
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-6 py-6">
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              Are you sure you want to delete this score?
              <br />
              This action cannot be undone.
            </div>

            {score && (
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Student:</span>{" "}
                  {getStudentName(score.student_id)}
                </p>

                <p>
                  <span className="font-medium">Subject:</span>{" "}
                  {getSubjectName(score.subject_id)}
                </p>

                <p>
                  <span className="font-medium">Score:</span> {score.score} /{" "}
                  {score.max_score || 100}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onDelete}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
            >
              <Trash2 size={17} />
              {saving ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {mode === "view" ? "Score Details" : "Edit Score"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {mode === "view"
                ? "View student score information"
                : "Update score information"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {mode === "view" && score ? (
          <div className="space-y-6 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gray-100 p-4">
                <div className="mb-2 flex items-center gap-2 text-gray-500">
                  <User size={18} />
                  <span className="text-sm">Student</span>
                </div>

                <p className="font-semibold text-gray-800">
                  {getStudentName(score.student_id)}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Student ID: {score.student_id}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-4">
                <div className="mb-2 flex items-center gap-2 text-gray-500">
                  <BookOpen size={18} />
                  <span className="text-sm">Subject</span>
                </div>

                <p className="font-semibold text-gray-800">
                  {getSubjectName(score.subject_id)}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Subject ID: {score.subject_id}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-4">
                <div className="mb-2 flex items-center gap-2 text-gray-500">
                  <School size={18} />
                  <span className="text-sm">Class</span>
                </div>

                <p className="font-semibold text-gray-800">
                  {getClassName(score.class_id)}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-4">
                <div className="mb-2 flex items-center gap-2 text-gray-500">
                  <GraduationCap size={18} />
                  <span className="text-sm">Teacher</span>
                </div>

                <p className="font-semibold text-gray-800">
                  {getTeacherName(score.teacher_id)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-blue-50 p-5">
                <p className="text-sm text-blue-500">Exam Type</p>

                <p className="mt-1 text-lg font-bold capitalize text-blue-700">
                  {score.exam_type}
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-5">
                <p className="text-sm text-green-500">Score</p>

                <p className="mt-1 text-lg font-bold text-green-700">
                  {score.score} / {score.max_score || 100}
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-5">
                <p className="text-sm text-purple-500">Percentage</p>

                <p className="mt-1 text-lg font-bold text-purple-700">
                  {percentage}%
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={18} />
                  <span className="text-sm">Exam Date</span>
                </div>

                <p className="mt-2 font-medium text-gray-800">
                  {score.exam_date
                    ? new Date(score.exam_date).toLocaleDateString()
                    : "-"}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Award size={18} />
                  <span className="text-sm">Result</span>
                </div>

                <p
                  className={`mt-2 font-semibold ${
                    Number(percentage) >= 50 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {Number(percentage) >= 50 ? "Passed" : "Failed"}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 p-4">
              <p className="mb-2 text-sm font-medium text-gray-500">Remark</p>

              <p className="text-sm text-gray-700">
                {score.remark || "No remark"}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Student
                </label>

                <select
                  name="student_id"
                  value={formData.student_id}
                  onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
                  min="0"
                  step="0.01"
                  placeholder="Example: 100"
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
                  onChange={onChange}
                  rows="4"
                  placeholder="Enter remark..."
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
              <button
                type="button"
                onClick={onClose}
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
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ScoreModal;
