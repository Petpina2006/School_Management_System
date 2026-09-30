import { useEffect, useState } from "react";

import ScoreHeader from "../../components/teacher/scores/ScoreHeader";
import ScoreStats from "../../components/teacher/scores/ScoreStats";
import ScoreTable from "../../components/teacher/scores/ScoreTable";
import ScoreModal from "../../components/teacher/scores/ScoreModal";

import {
  getTeacherScores,
  createTeacherScore,
  getTeacherStudents,
  getTeacherSubjects,
} from "../../services/teachers/teacherApi";

export default function TeacherScores() {
  const [scores, setScores] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [scoresResponse, studentsResponse, subjectsResponse] =
        await Promise.all([
          getTeacherScores(),
          getTeacherStudents(),
          getTeacherSubjects(),
        ]);

      setScores(scoresResponse?.data ?? scoresResponse ?? []);
      setStudents(studentsResponse?.data ?? studentsResponse ?? []);
      setSubjects(subjectsResponse?.data ?? subjectsResponse ?? []);
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
      await createTeacherScore(form);

      setShowModal(false);

      await loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to save score.");
    }
  };

  return (
    <div className="space-y-6">
      <ScoreHeader onAdd={() => setShowModal(true)} />

      <ScoreStats scores={scores} />

      {loading ? (
        <p className="text-slate-500">Loading scores...</p>
      ) : (
        <ScoreTable scores={scores} />
      )}

      {showModal && (
        <ScoreModal
          students={students}
          subjects={subjects}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
