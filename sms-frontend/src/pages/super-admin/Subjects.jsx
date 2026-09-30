import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import SubjectHeader from "../../components/super-admin/subjects/SubjectHeader";
import SubjectStats from "../../components/super-admin/subjects/SubjectStats";
import SubjectFilter from "../../components/super-admin/subjects/SubjectFilter";
import SubjectTable from "../../components/super-admin/subjects/SubjectTable";
import SubjectPagination from "../../components/super-admin/subjects/SubjectPagination";
import SubjectModal from "../../components/super-admin/subjects/SubjectModal";

import {
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
} from "../../services/subjectApi";

const Subjects = () => {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [formData, setFormData] = useState({
    subject_code: "",
    subject_name: "",
    description: "",
    status: "active",
  });

  // FETCH SUBJECTS
  const fetchSubjects = useCallback(async (page = 1) => {
    try {
      setLoading(true);

      const result = await getSubjects(page);

      setSubjects(result.data?.data || []);
      setPagination(result.data || null);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubjects(1);
  }, [fetchSubjects]);

  // VIEW
  const handleView = async (subject) => {
    try {
      const result = await getSubject(subject.id);

      setSelectedSubject(result.data || subject);
      setModalMode("view");
      setModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch subject:", error);

      setSelectedSubject(subject);
      setModalMode("view");
      setModalOpen(true);
    }
  };

  // EDIT
  const handleEdit = (subject) => {
    setSelectedSubject(subject);

    setFormData({
      subject_code: subject.subject_code || "",
      subject_name: subject.subject_name || "",
      description: subject.description || "",
      status: subject.status || "active",
    });

    setModalMode("edit");
    setModalOpen(true);
  };

  // DELETE
  const handleDelete = (subject) => {
    setSelectedSubject(subject);
    setModalMode("delete");
    setModalOpen(true);
  };

  // CHANGE FORM
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedSubject) return;

    try {
      setSaving(true);

      await updateSubject(selectedSubject.id, formData);

      setModalOpen(false);
      setSelectedSubject(null);

      await fetchSubjects(currentPage);
    } catch (error) {
      console.error("Failed to update subject:", error);
    } finally {
      setSaving(false);
    }
  };

  // CONFIRM DELETE
  const handleConfirmDelete = async () => {
    if (!selectedSubject) return;

    try {
      setSaving(true);

      await deleteSubject(selectedSubject.id);

      setModalOpen(false);
      setSelectedSubject(null);

      // If current page becomes empty, go previous page
      if (subjects.length === 1 && currentPage > 1) {
        await fetchSubjects(currentPage - 1);
      } else {
        await fetchSubjects(currentPage);
      }
    } catch (error) {
      console.error("Failed to delete subject:", error);
    } finally {
      setSaving(false);
    }
  };

  // CLEAR FILTER
  const handleClearFilter = () => {
    setSearch("");
    setStatusFilter("all");
  };

  // FILTER
  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        subject.subject_code?.toLowerCase().includes(keyword) ||
        subject.subject_name?.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "all" || subject.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [subjects, search, statusFilter]);

  // PREVIOUS
  const handlePrevious = () => {
    if (currentPage > 1) {
      fetchSubjects(currentPage - 1);
    }
  };

  // NEXT
  const handleNext = () => {
    if (pagination && currentPage < pagination.last_page) {
      fetchSubjects(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50  ">
      <div className="mx-auto max-w-8xl">
        <SubjectHeader
          loading={loading}
          onRefresh={() => fetchSubjects(currentPage)}
          onAdd={() => navigate("/super-admin/subjects/create")}
        />

        <SubjectStats subjects={subjects} />

        <SubjectFilter
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onClear={handleClearFilter}
        />

        <SubjectTable
          subjects={filteredSubjects}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <SubjectPagination
          pagination={pagination}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>

      <SubjectModal
        open={modalOpen}
        mode={modalMode}
        subject={selectedSubject}
        formData={formData}
        onChange={handleChange}
        onClose={() => {
          setModalOpen(false);
          setSelectedSubject(null);
        }}
        onSubmit={handleUpdate}
        onEdit={() => handleEdit(selectedSubject)}
        onDelete={
          modalMode === "view"
            ? () => handleDelete(selectedSubject)
            : handleConfirmDelete
        }
        saving={saving}
      />
    </div>
  );
};

export default Subjects;
