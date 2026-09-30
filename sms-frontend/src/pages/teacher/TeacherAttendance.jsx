import { useEffect, useState } from "react";

import AttendanceHeader from "../../components/teacher/attendance/AttendanceHeader";
import AttendanceStats from "../../components/teacher/attendance/AttendanceStats";
import AttendanceTable from "../../components/teacher/attendance/AttendanceTable";
import AttendanceModal from "../../components/teacher/attendance/AttendanceModal";

import {
  getTeacherAttendance,
  createTeacherAttendance,
  getTeacherStudents,
} from "../../services/teachers/teacherApi";

export default function TeacherAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [attendanceResponse, studentsResponse] = await Promise.all([
        getTeacherAttendance(),
        getTeacherStudents(),
      ]);

      setAttendance(attendanceResponse?.data ?? attendanceResponse ?? []);

      setStudents(studentsResponse?.data ?? studentsResponse ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (form) => {
    try {
      await createTeacherAttendance(form);

      setShowModal(false);

      await loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to save attendance.");
    }
  };

  return (
    <div className="space-y-6">
      <AttendanceHeader onAdd={() => setShowModal(true)} />

      <AttendanceStats attendance={attendance} />

      {loading ? (
        <p className="text-slate-500">Loading attendance...</p>
      ) : (
        <AttendanceTable attendance={attendance} />
      )}

      {showModal && (
        <AttendanceModal
          students={students}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
