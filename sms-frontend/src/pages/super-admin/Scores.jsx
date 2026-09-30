import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ScoreHeader from "../../components/super-admin/scores/ScoreHeader";
import ScoreStats from "../../components/super-admin/scores/ScoreStats";
import ScoreFilter from "../../components/super-admin/scores/ScoreFilter";
import ScoreTable from "../../components/super-admin/scores/ScoreTable";
import ScorePagination from "../../components/super-admin/scores/ScorePagination";
import ScoreModal from "../../components/super-admin/scores/ScoreModal";

import { getScores, updateScore, deleteScore } from "../../services/scoreApi";

import { apiFetch } from "../../services/api";

const Scores = () => {
  const navigate = useNavigate();

  const [scores, setScores] = useState([]);

  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [pagination, setPagination] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [examType, setExamType] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");

  const [selectedScore, setSelectedScore] = useState(null);

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
    loadScores(1);
    loadDropdownData();
  }, []);

  const normalizeData = (result) => {
    return result?.data?.data || result?.data || [];
  };

  const loadScores = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const result = await getScores(page);

      const paginated = result?.data;

      setScores(paginated?.data || []);
      setPagination(paginated || null);
    } catch (err) {
      setError(err.response?.message || err.message || "Failed to load scores");
    } finally {
      setLoading(false);
    }
  };

  const loadDropdownData = async () => {
    try {
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
      console.error("Failed to load dropdown data:", err);
    }
  };

  const filteredScores = useMemo(() => {
    return scores.filter((item) => {
      const studentName =
        item.student?.Full_name ||
        item.student?.full_name ||
        item.student?.name ||
        "";

      const subjectName = item.subject?.subject_name || "";

      const searchText = search.toLowerCase();

      const matchesSearch =
        studentName.toLowerCase().includes(searchText) ||
        subjectName.toLowerCase().includes(searchText);

      const matchesExam = !examType || item.exam_type === examType;

      return matchesSearch && matchesExam;
    });
  }, [scores, search, examType]);

  const openViewModal = (score) => {
    setSelectedScore(score);
    setModalMode("view");
    setModalOpen(true);
  };

  const openEditModal = (score) => {
    setSelectedScore(score);

    setFormData({
      student_id: score.student_id || "",
      subject_id: score.subject_id || "",
      class_id: score.class_id || "",
      teacher_id: score.teacher_id || "",
      exam_type: score.exam_type || "",
      score: score.score ?? "",
      max_score: score.max_score ?? "100",
      exam_date: score.exam_date ? score.exam_date.substring(0, 10) : "",
      remark: score.remark || "",
    });

    setModalMode("edit");
    setModalOpen(true);
  };

  const openDeleteModal = (score) => {
    setSelectedScore(score);
    setModalMode("delete");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) {
      return;
    }

    setModalOpen(false);
    setSelectedScore(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedScore) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await updateScore(selectedScore.id, {
        ...formData,
        student_id: Number(formData.student_id),
        subject_id: Number(formData.subject_id),
        class_id: Number(formData.class_id),
        teacher_id: Number(formData.teacher_id),
        score: Number(formData.score),
        max_score: formData.max_score ? Number(formData.max_score) : null,
      });

      closeModal();
      await loadScores(pagination?.current_page || 1);
    } catch (err) {
      setError(
        err.response?.message || err.message || "Failed to update score",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedScore) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await deleteScore(selectedScore.id);

      setModalOpen(false);
      setSelectedScore(null);

      const currentPage = pagination?.current_page || 1;

      await loadScores(
        scores.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage,
      );
    } catch (err) {
      setError(
        err.response?.message || err.message || "Failed to delete score",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="">
      <ScoreHeader
        onRefresh={() => loadScores(pagination?.current_page || 1)}
        onAdd={() => navigate("/super-admin/scores/create")}
      />

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <ScoreStats scores={scores} />

      <ScoreFilter
        search={search}
        setSearch={setSearch}
        examType={examType}
        setExamType={setExamType}
      />

      {loading ? (
        <div className="rounded-xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-gray-500">Loading scores...</p>
        </div>
      ) : (
        <ScoreTable
          scores={filteredScores}
          onView={openViewModal}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />
      )}

      <ScorePagination
        pagination={pagination}
        onPrevious={() => loadScores(pagination.current_page - 1)}
        onNext={() => loadScores(pagination.current_page + 1)}
      />

      <ScoreModal
        open={modalOpen}
        mode={modalMode}
        score={selectedScore}
        formData={formData}
        students={students}
        subjects={subjects}
        classes={classes}
        teachers={teachers}
        onClose={closeModal}
        onChange={handleChange}
        onSubmit={handleUpdate}
        onEdit={() => {
          if (selectedScore) {
            openEditModal(selectedScore);
          }
        }}
        onDelete={handleDelete}
        saving={saving}
      />
    </div>
  );
};

export default Scores;
