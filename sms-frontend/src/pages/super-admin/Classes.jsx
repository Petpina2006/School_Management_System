import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ClassHeader from "../../components/super-admin/classes/ClassHeader";
import ClassStats from "../../components/super-admin/classes/ClassStats";
import ClassFilter from "../../components/super-admin/classes/ClassFilter";
import ClassTable from "../../components/super-admin/classes/ClassTable";
import ClassPagination from "../../components/super-admin/classes/ClassPagination";
import ClassModal from "../../components/super-admin/classes/ClassModal";

import { getClasses, updateClass, deleteClass } from "../../services/classApi";

const Classes = () => {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [academicYearFilter, setAcademicYearFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");

  const [selectedClass, setSelectedClass] = useState(null);

  const [formData, setFormData] = useState({
    class_name: "",
    grade: "",
    section: "",
    room: "",
    academic_year: "",
    teacher_id: "",
  });

  // FETCH CLASSES
  const fetchClasses = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const result = await getClasses(page);

      console.log("Classes:", result);

      setClasses(result.data?.data || []);
      setPagination(result.data || null);
    } catch (err) {
      console.error("Fetch Classes Error:", err);

      setError(
        err?.response?.message || err?.message || "Failed to fetch classes.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses(currentPage);
  }, [currentPage]);

  // REFRESH
  const handleRefresh = () => {
    fetchClasses(currentPage);
  };

  // ADD
  const handleAdd = () => {
    navigate("/super-admin/classes/create");
  };

  // VIEW
  const handleView = (classData) => {
    setSelectedClass(classData);
    setModalMode("view");
    setModalOpen(true);
  };

  // EDIT
  const handleEdit = (classData) => {
    setSelectedClass(classData);

    setFormData({
      class_name: classData.class_name || "",
      grade: classData.grade || "",
      section: classData.section || "",
      room: classData.room || "",
      academic_year: classData.academic_year || "",
      teacher_id: classData.teacher_id || "",
    });

    setModalMode("edit");
    setModalOpen(true);
  };

  // EDIT FROM VIEW
  const handleEditFromView = () => {
    if (!selectedClass) {
      return;
    }

    setFormData({
      class_name: selectedClass.class_name || "",
      grade: selectedClass.grade || "",
      section: selectedClass.section || "",
      room: selectedClass.room || "",
      academic_year: selectedClass.academic_year || "",
      teacher_id: selectedClass.teacher_id || "",
    });

    setModalMode("edit");
  };

  // DELETE
  const handleDelete = (classData) => {
    setSelectedClass(classData);
    setModalMode("delete");
    setModalOpen(true);
  };

  // CONFIRM DELETE
  const handleConfirmDelete = async () => {
    if (!selectedClass) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await deleteClass(selectedClass.id);

      setModalOpen(false);
      setSelectedClass(null);

      if (classes.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        await fetchClasses(currentPage);
      }
    } catch (err) {
      console.error("Delete Class Error:", err);

      setError(
        err?.response?.message || err?.message || "Failed to delete class.",
      );
    } finally {
      setSaving(false);
    }
  };

  // FORM CHANGE
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedClass) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await updateClass(selectedClass.id, {
        ...formData,
        teacher_id: Number(formData.teacher_id),
      });

      setModalOpen(false);
      setSelectedClass(null);

      await fetchClasses(currentPage);
    } catch (err) {
      console.error("Update Class Error:", err);

      setError(
        err?.response?.message || err?.message || "Failed to update class.",
      );
    } finally {
      setSaving(false);
    }
  };

  // FILTER
  const filteredClasses = classes.filter((item) => {
    const searchValue = search.toLowerCase();

    const teacherName = item.teacher
      ? `${item.teacher.first_name || ""} ${
          item.teacher.last_name || ""
        }`.toLowerCase()
      : "";

    const matchesSearch =
      item.class_name?.toLowerCase().includes(searchValue) ||
      item.grade?.toLowerCase().includes(searchValue) ||
      item.section?.toLowerCase().includes(searchValue) ||
      item.room?.toLowerCase().includes(searchValue) ||
      teacherName.includes(searchValue);

    const matchesGrade = gradeFilter === "all" || item.grade === gradeFilter;

    const matchesAcademicYear =
      academicYearFilter === "all" ||
      item.academic_year
        ?.toLowerCase()
        .includes(academicYearFilter.toLowerCase());

    return matchesSearch && matchesGrade && matchesAcademicYear;
  });

  // NEXT
  const handleNext = () => {
    if (pagination?.next_page_url) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // PREVIOUS
  const handlePrevious = () => {
    if (pagination?.prev_page_url) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // CLOSE MODAL
  const handleCloseModal = () => {
    if (saving) {
      return;
    }

    setModalOpen(false);
    setSelectedClass(null);
    setModalMode("view");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <ClassHeader
        onRefresh={handleRefresh}
        onAdd={handleAdd}
        loading={loading}
      />

      {/* ERROR */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* STATS */}
      <ClassStats classes={classes} />

      {/* FILTER */}
      <ClassFilter
        search={search}
        setSearch={setSearch}
        gradeFilter={gradeFilter}
        setGradeFilter={setGradeFilter}
        academicYearFilter={academicYearFilter}
        setAcademicYearFilter={setAcademicYearFilter}
      />

      {/* TABLE */}
      <ClassTable
        classes={filteredClasses}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* PAGINATION */}
      <ClassPagination
        pagination={pagination}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      {/* MODAL */}
      <ClassModal
        open={modalOpen}
        classData={selectedClass}
        mode={modalMode}
        formData={formData}
        saving={saving}
        onClose={handleCloseModal}
        onChange={handleFormChange}
        onSubmit={handleUpdate}
        onEdit={handleEditFromView}
        onDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default Classes;
