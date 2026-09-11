import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentsHeader from "../../components/super-admin/students/StudentsHeader";
import StudentsStats from "../../components/super-admin/students/StudentsStats";
import StudentsFilter from "../../components/super-admin/students/StudentsFilter";
import StudentsTable from "../../components/super-admin/students/StudentsTable";
import StudentsPagination from "../../components/super-admin/students/StudentsPagination";
import StudentsModal from "../../components/super-admin/students/StudentsModal";

import {
  getStudents,
  updateStudent,
  deleteStudent,
} from "../../services/studentApi";

const Students = () => {
  // =========================================
  // STATES
  // =========================================
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  const [pagination, setPagination] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // Modal
  const [modalOpen, setModalOpen] = useState(false);

  const [modalMode, setModalMode] = useState("view");

  const [selectedStudent, setSelectedStudent] = useState(null);

  // Form
  const [formData, setFormData] = useState({
    student_code: "",
    Full_name: "",
    gender: "",
    date_of_birth: "",
    phone: "",
    address: "",
    parent_name: "",
    parent_phone: "",
    status: "active",
  });

  // Filters
  const [search, setSearch] = useState("");

  const [genderFilter, setGenderFilter] = useState("all");

  const [statusFilter, setStatusFilter] = useState("all");

  // =========================================
  // FETCH STUDENTS
  // =========================================

  const fetchStudents = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const result = await getStudents(page);

      if (!result?.status) {
        throw new Error(result?.message || "Failed to fetch students");
      }

      setStudents(result.data?.data || []);

      setPagination(result.data || null);
    } catch (error) {
      console.error("Fetch Students Error:", error);

      setError(error?.message || "Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // INITIAL FETCH
  // =========================================

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  // =========================================
  // CHANGE FORM
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // OPEN VIEW MODAL
  // =========================================

  const handleView = (student) => {
    setSelectedStudent(student);

    setModalMode("view");

    setModalOpen(true);
  };

  // =========================================
  // OPEN EDIT MODAL
  // =========================================

  const handleEdit = (student) => {
    setSelectedStudent(student);

    setFormData({
      student_code: student.student_code || "",
      Full_name: student.Full_name || "",
      gender: student.gender || "",
      date_of_birth: student.date_of_birth || "",
      phone: student.phone || "",
      address: student.address || "",
      parent_name: student.parent_name || "",
      parent_phone: student.parent_phone || "",
      status: student.status || "active",
    });

    setModalMode("edit");

    setModalOpen(true);
  };

  // =========================================
  // CLOSE MODAL
  // =========================================

  const handleCloseModal = () => {
    if (saving) return;

    setModalOpen(false);

    setSelectedStudent(null);

    setModalMode("view");
  };

  // =========================================
  // UPDATE STUDENT
  // =========================================

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedStudent) {
      return;
    }

    try {
      setSaving(true);

      setError("");

      const result = await updateStudent(selectedStudent.id, formData);

      if (!result?.status) {
        throw new Error(result?.message || "Failed to update student");
      }

      // Close modal
      setModalOpen(false);

      setSelectedStudent(null);

      // Refresh current page
      await fetchStudents(currentPage);
    } catch (error) {
      console.error("Update Student Error:", error);

      setError(error?.message || "Failed to update student.");
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // DELETE STUDENT
  // =========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setSaving(true);

      setError("");

      const result = await deleteStudent(id);

      if (!result?.status) {
        throw new Error(result?.message || "Failed to delete student");
      }

      // Close modal
      setModalOpen(false);

      setSelectedStudent(null);

      // If current page becomes empty,
      // go to previous page
      if (students.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        await fetchStudents(currentPage);
      }
    } catch (error) {
      console.error("Delete Student Error:", error);

      setError(error?.message || "Failed to delete student.");
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // REFRESH
  // =========================================

  const handleRefresh = () => {
    fetchStudents(currentPage);
  };

  // =========================================
  // ADD STUDENT
  // =========================================

  const handleAdd = () => {
    // You can navigate to CreateStudent.jsx
    window.location.href = "/super-admin/students/create";
  };

  // =========================================
  // CLEAR FILTER
  // =========================================

  const handleClearFilters = () => {
    setSearch("");

    setGenderFilter("all");

    setStatusFilter("all");
  };

  // =========================================
  // FILTER STUDENTS
  // =========================================
  // NOTE:
  // Your current Laravel StudentController
  // does NOT support search/gender/status
  // query parameters.
  //
  // Therefore these filters currently work
  // only on the students loaded on the current
  // page.

  const filteredStudents = students.filter((student) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      student.student_code?.toLowerCase().includes(searchValue) ||
      student.Full_name?.toLowerCase().includes(searchValue) ||
      student.phone?.toLowerCase().includes(searchValue);

    const matchesGender =
      genderFilter === "all" || student.gender === genderFilter;

    const matchesStatus =
      statusFilter === "all" || student.status === statusFilter;

    return matchesSearch && matchesGender && matchesStatus;
  });

  // =========================================
  // PAGINATION
  // =========================================

  const handleNext = () => {
    if (pagination && currentPage < pagination.last_page) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="w-full space-y-6">
      {/* =====================================
                HEADER
            ===================================== */}

      <StudentsHeader
        loading={loading}
        onRefresh={handleRefresh}
        onAdd={() => navigate("/super-admin/students/create")}
      />

      {/* =====================================
                ERROR
            ===================================== */}

      {error && (
        <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          <span>{error}</span>

          <button
            type="button"
            onClick={() => fetchStudents(currentPage)}
            className="font-medium underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* =====================================
                STATS
            ===================================== */}

      <StudentsStats students={students} pagination={pagination} />

      {/* =====================================
                FILTER
            ===================================== */}

      <StudentsFilter
        search={search}
        setSearch={setSearch}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      {/* =====================================
                TABLE
            ===================================== */}

      <StudentsTable
        students={filteredStudents}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* =====================================
                PAGINATION
            ===================================== */}

      <StudentsPagination
        pagination={pagination}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      {/* =====================================
                STUDENT MODAL
            ===================================== */}

      <StudentsModal
        open={modalOpen}
        student={selectedStudent}
        mode={modalMode}
        formData={formData}
        saving={saving}
        onClose={handleCloseModal}
        onChange={handleChange}
        onSubmit={handleUpdate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Students;
