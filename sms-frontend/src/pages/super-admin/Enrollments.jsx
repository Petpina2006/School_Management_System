import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import EnrollmentHeader from "../../components/super-admin/enrollments/EnrollmentHeader";
import EnrollmentStats from "../../components/super-admin/enrollments/EnrollmentStats";
import EnrollmentFilter from "../../components/super-admin/enrollments/EnrollmentFilter";
import EnrollmentTable from "../../components/super-admin/enrollments/EnrollmentTable";
import EnrollmentPagination from "../../components/super-admin/enrollments/EnrollmentPagination";
import EnrollmentModal from "../../components/super-admin/enrollments/EnrollmentModal";

import {
  getEnrollments,
  getEnrollment,
  updateEnrollment,
  deleteEnrollment,
} from "../../services/enrollmentApi";

const Enrollments = () => {
  const navigate = useNavigate();

  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  const [pagination, setPagination] = useState(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [academicYear, setAcademicYear] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  const [formData, setFormData] = useState({
    student_id: "",
    class_id: "",
    academic_year: "",
    enrollment_date: "",
    status: "active",
  });

  // ============================================================
  // FETCH ENROLLMENTS
  // ============================================================

  const fetchEnrollments = useCallback(async (page = 1) => {
    try {
      setLoading(true);

      const result = await getEnrollments(page);

      setEnrollments(result.data?.data || []);
      setPagination(result.data || null);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch enrollments:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================================================
  // FETCH STUDENTS
  // ============================================================

  const fetchStudents = useCallback(async () => {
    try {
      const result = await fetch(
        "http://127.0.0.1:8000/api/super-admin/students",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const data = await result.json();

      setStudents(data.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  }, []);

  // ============================================================
  // FETCH CLASSES
  // ============================================================

  const fetchClasses = useCallback(async () => {
    try {
      const result = await fetch(
        "http://127.0.0.1:8000/api/super-admin/classes",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const data = await result.json();

      setClasses(data.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    }
  }, []);

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    fetchEnrollments(1);
    fetchStudents();
    fetchClasses();
  }, [fetchEnrollments, fetchStudents, fetchClasses]);

  // ============================================================
  // VIEW
  // ============================================================

  const handleView = async (enrollment) => {
    try {
      const result = await getEnrollment(enrollment.id);

      setSelectedEnrollment(result.data || enrollment);

      setModalMode("view");
      setModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch enrollment:", error);

      setSelectedEnrollment(enrollment);
      setModalMode("view");
      setModalOpen(true);
    }
  };

  // ============================================================
  // EDIT
  // ============================================================

  const handleEdit = (enrollment) => {
    setSelectedEnrollment(enrollment);

    setFormData({
      student_id: enrollment.student_id || "",
      class_id: enrollment.class_id || "",
      academic_year: enrollment.academic_year || "",
      enrollment_date: enrollment.enrollment_date || "",
      status: enrollment.status || "active",
    });

    setModalMode("edit");
    setModalOpen(true);
  };

  // ============================================================
  // DELETE
  // ============================================================

  const handleDelete = (enrollment) => {
    setSelectedEnrollment(enrollment);

    setModalMode("delete");
    setModalOpen(true);
  };

  // ============================================================
  // INPUT CHANGE
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // UPDATE
  // ============================================================

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedEnrollment) return;

    try {
      setSaving(true);

      await updateEnrollment(selectedEnrollment.id, formData);

      setModalOpen(false);
      setSelectedEnrollment(null);

      await fetchEnrollments(currentPage);
    } catch (error) {
      console.error("Failed to update enrollment:", error);
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // CONFIRM DELETE
  // ============================================================

  const handleConfirmDelete = async () => {
    if (!selectedEnrollment) return;

    try {
      setSaving(true);

      await deleteEnrollment(selectedEnrollment.id);

      setModalOpen(false);
      setSelectedEnrollment(null);

      if (enrollments.length === 1 && currentPage > 1) {
        await fetchEnrollments(currentPage - 1);
      } else {
        await fetchEnrollments(currentPage);
      }
    } catch (error) {
      console.error("Failed to delete enrollment:", error);
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // CLEAR FILTER
  // ============================================================

  const handleClearFilter = () => {
    setSearch("");
    setAcademicYear("all");
    setStatusFilter("all");
  };

  // ============================================================
  // FILTER
  // ============================================================

  const filteredEnrollments = useMemo(() => {
    return enrollments.filter((enrollment) => {
      const keyword = search.toLowerCase();

      const student =
        enrollment.student?.Full_name || enrollment.student?.full_name || "";

      const studentCode = enrollment.student?.student_code || "";

      const className = enrollment.class?.class_name || "";

      const matchesSearch =
        student.toLowerCase().includes(keyword) ||
        studentCode.toLowerCase().includes(keyword) ||
        className.toLowerCase().includes(keyword);

      const matchesYear =
        academicYear === "all" || enrollment.academic_year === academicYear;

      const matchesStatus =
        statusFilter === "all" || enrollment.status === statusFilter;

      return matchesSearch && matchesYear && matchesStatus;
    });
  }, [enrollments, search, academicYear, statusFilter]);

  // ============================================================
  // PAGINATION
  // ============================================================

  const handlePrevious = () => {
    if (currentPage > 1) {
      fetchEnrollments(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (pagination && currentPage < pagination.last_page) {
      fetchEnrollments(currentPage + 1);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-50  ">
      <div className="mx-auto max-w-8xl">
        <EnrollmentHeader
          loading={loading}
          onRefresh={() => fetchEnrollments(currentPage)}
          onAdd={() => navigate("/super-admin/enrollments/create")}
        />

        <EnrollmentStats enrollments={enrollments} />

        <EnrollmentFilter
          search={search}
          setSearch={setSearch}
          academicYear={academicYear}
          setAcademicYear={setAcademicYear}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onClear={handleClearFilter}
        />

        <EnrollmentTable
          enrollments={filteredEnrollments}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <EnrollmentPagination
          pagination={pagination}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>

      <EnrollmentModal
        open={modalOpen}
        mode={modalMode}
        enrollment={selectedEnrollment}
        formData={formData}
        students={students}
        classes={classes}
        onChange={handleChange}
        onClose={() => {
          setModalOpen(false);
          setSelectedEnrollment(null);
        }}
        onSubmit={handleUpdate}
        onEdit={() => handleEdit(selectedEnrollment)}
        onDelete={
          modalMode === "view"
            ? () => handleDelete(selectedEnrollment)
            : handleConfirmDelete
        }
        saving={saving}
      />
    </div>
  );
};

export default Enrollments;
