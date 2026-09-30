import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TeachersHeader from "../../components/super-admin/teachers/TeachersHeader";
import TeachersStats from "../../components/super-admin/teachers/TeachersStats";
import TeachersFilter from "../../components/super-admin/teachers/TeachersFilter";
import TeachersTable from "../../components/super-admin/teachers/TeachersTable";
import TeachersPagination from "../../components/super-admin/teachers/TeachersPagination";
import TeachersModal from "../../components/super-admin/teachers/TeachersModal";

import {
  getTeachers,
  updateTeacher,
  deleteTeacher,
} from "../../services/teacherApi";

const Teachers = () => {
  const navigate = useNavigate();
  // DATA
  const [teachers, setTeachers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [stats, setStats] = useState(null);
  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  // UI STATE
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  // FILTER
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  // MODAL
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  // FORM DATA
  const [formData, setFormData] = useState({
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
  });
  // FETCH TEACHERS
  const fetchTeachers = async (page = 1) => {
    try {
      setLoading(true);
      setError("");
      const result = await getTeachers(page);
      setTeachers(result.data?.data || []);
      setPagination(result.data || null);
      setStats(result.stats || null);
    } catch (err) {
      console.error("Fetch Teachers Error:", err);
      setError(
        err?.response?.message || err?.message || "Failed to fetch teachers.",
      );
    } finally {
      setLoading(false);
    }
  };
  // FIRST LOAD
  useEffect(() => {
    fetchTeachers(currentPage);
  }, [currentPage]);

  // REFRESH
  const handleRefresh = () => {
    fetchTeachers(currentPage);
  };

  // ADD TEACHER
  const handleAdd = () => {
    navigate("/super-admin/teachers/create");
  };

  // VIEW TEACHER
  const handleView = (teacher) => {
    setSelectedTeacher(teacher);
    setModalMode("view");
    setModalOpen(true);
  };

  // EDIT TEACHER
  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);

    setFormData({
      teacher_code: teacher.teacher_code || "",
      first_name: teacher.first_name || "",
      last_name: teacher.last_name || "",
      gender: teacher.gender || "male",
      date_of_birth: teacher.date_of_birth || "",
      phone: teacher.phone || "",
      address: teacher.address || "",
      hire_date: teacher.hire_date || "",
      specialization: teacher.specialization || "",
      status: teacher.status || "active",
    });

    setModalMode("edit");
    setModalOpen(true);
  };

  // OPEN EDIT FROM VIEW
  const handleEditFromView = () => {
    if (!selectedTeacher) return;

    setFormData({
      teacher_code: selectedTeacher.teacher_code || "",
      first_name: selectedTeacher.first_name || "",
      last_name: selectedTeacher.last_name || "",
      gender: selectedTeacher.gender || "male",
      date_of_birth: selectedTeacher.date_of_birth || "",
      phone: selectedTeacher.phone || "",
      address: selectedTeacher.address || "",
      hire_date: selectedTeacher.hire_date || "",
      specialization: selectedTeacher.specialization || "",
      status: selectedTeacher.status || "active",
    });

    setModalMode("edit");
  };

  // DELETE CLICK
  const handleDelete = (teacher) => {
    setSelectedTeacher(teacher);
    setModalMode("delete");
    setModalOpen(true);
  };

  // CONFIRM DELETE
  const handleConfirmDelete = async () => {
    if (!selectedTeacher) return;

    try {
      setSaving(true);
      setError("");

      await deleteTeacher(selectedTeacher.id);

      setModalOpen(false);
      setSelectedTeacher(null);

      // If deleting the last item on a page
      if (teachers.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        await fetchTeachers(currentPage);
      }
    } catch (err) {
      console.error("Delete Teacher Error:", err);

      setError(
        err?.response?.message || err?.message || "Failed to delete teacher.",
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

  // UPDATE TEACHER
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedTeacher) return;

    try {
      setSaving(true);
      setError("");

      await updateTeacher(selectedTeacher.id, formData);

      setModalOpen(false);
      setSelectedTeacher(null);

      await fetchTeachers(currentPage);
    } catch (err) {
      console.error("Update Teacher Error:", err);

      setError(
        err?.response?.message || err?.message || "Failed to update teacher.",
      );
    } finally {
      setSaving(false);
    }
  };

  // FILTER TEACHERS
  const filteredTeachers = teachers.filter((teacher) => {
    const fullName = `${teacher.first_name || ""} ${
      teacher.last_name || ""
    }`.toLowerCase();

    const searchValue = search.toLowerCase();

    const matchesSearch =
      teacher.teacher_code?.toLowerCase().includes(searchValue) ||
      fullName.includes(searchValue) ||
      teacher.phone?.toLowerCase().includes(searchValue) ||
      teacher.specialization?.toLowerCase().includes(searchValue);

    const matchesGender =
      genderFilter === "all" || teacher.gender === genderFilter;

    const matchesStatus =
      statusFilter === "all" || teacher.status === statusFilter;

    return matchesSearch && matchesGender && matchesStatus;
  });

  // NEXT PAGE
  const handleNext = () => {
    if (pagination?.next_page_url) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // PREVIOUS PAGE
  const handlePrevious = () => {
    if (pagination?.prev_page_url) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // CLOSE MODAL
  const handleCloseModal = () => {
    if (saving) return;

    setModalOpen(false);
    setSelectedTeacher(null);
    setModalMode("view");
  };

  return (
    <div className="space-y-6">
      {/* =========================
                HEADER
            ========================= */}
      <TeachersHeader
        onRefresh={handleRefresh}
        onAdd={handleAdd}
        loading={loading}
      />

      {/* =========================
                ERROR
            ========================= */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =========================
                STATS
            ========================= */}
      <TeachersStats teachers={teachers} />

      {/* =========================
                FILTER
            ========================= */}
      <TeachersFilter
        search={search}
        setSearch={setSearch}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* =========================
                TABLE
            ========================= */}
      <TeachersTable
        teachers={filteredTeachers}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* =========================
                PAGINATION
            ========================= */}
      <TeachersPagination
        pagination={pagination}
        currentPage={currentPage}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      {/* =========================
                MODAL
            ========================= */}
      <TeachersModal
        open={modalOpen}
        teacher={selectedTeacher}
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

export default Teachers;
