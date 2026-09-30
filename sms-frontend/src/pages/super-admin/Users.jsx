import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import UsersHeader from "../../components/super-admin/users/UsersHeader";
import UsersStats from "../../components/super-admin/users/UsersStats";
import UsersFilter from "../../components/super-admin/users/UsersFilters";
import UsersTable from "../../components/super-admin/users/UsersTable";
import UsersPagination from "../../components/super-admin/users/UsersPagination";
import UserModal from "../../components/super-admin/users/UserModal";

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../../services/userApi";

const Users = () => {
  const navigate = useNavigate();

  // =========================================
  // USERS
  // =========================================
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  // =========================================
  // PAGINATION
  // =========================================
  const [pagination, setPagination] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  // =========================================
  // FILTER
  // =========================================
  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("all");

  const [statusFilter, setStatusFilter] = useState("all");

  // =========================================
  // MODAL
  // =========================================
  const [modalOpen, setModalOpen] = useState(false);

  const [modalMode, setModalMode] = useState("view");

  const [selectedUser, setSelectedUser] = useState(null);

  // =========================================
  // FORM
  // =========================================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    status: "",
  });

  // =========================================
  // FETCH USERS
  // =========================================
  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);

      const result = await getUsers(page);

      console.log("USERS API:", result);

      setUsers(result.data?.data || []);

      setPagination(result.data || null);

      setCurrentPage(result.data?.current_page || page);
    } catch (error) {
      console.error("Fetch users error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // INITIAL LOAD
  // =========================================
  useEffect(() => {
    fetchUsers(1);
  }, []);

  // =========================================
  // VIEW USER
  // =========================================
  const handleView = async (user) => {
    try {
      setSelectedUser(user);

      setModalMode("view");

      setModalOpen(true);

      // Optional: get latest user information
      const result = await getUser(user.id);

      if (result?.data) {
        setSelectedUser(result.data);
      }
    } catch (error) {
      console.error("View user error:", error);

      // Keep original user if GET detail fails
      setSelectedUser(user);
    }
  };

  // =========================================
  // EDIT USER
  // =========================================
  const handleEdit = (user) => {
    console.log("OPEN EDIT:", user);

    setSelectedUser(user);

    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "",
      status: user.status || "",
    });

    setModalMode("edit");

    setModalOpen(true);
  };

  // =========================================
  // OPEN DELETE
  // =========================================
  const handleDelete = (user) => {
    console.log("OPEN DELETE:", user);

    setSelectedUser(user);

    setModalMode("delete");

    setModalOpen(true);
  };

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
  // UPDATE USER
  // =========================================
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedUser?.id) {
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
      };

      // Only send password if user entered one
      if (formData.password?.trim()) {
        payload.password = formData.password;
      }

      console.log("UPDATE PAYLOAD:", payload);

      await updateUser(selectedUser.id, payload);

      // Close modal
      setModalOpen(false);

      setSelectedUser(null);

      // Refresh current page
      await fetchUsers(currentPage);
    } catch (error) {
      console.error("Update user error:", error);

      alert(error?.message || "Failed to update user.");
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // CONFIRM DELETE
  // =========================================
  const handleConfirmDelete = async () => {
    if (!selectedUser?.id) {
      return;
    }

    try {
      setSaving(true);

      setDeletingId(selectedUser.id);

      console.log("DELETE USER ID:", selectedUser.id);

      await deleteUser(selectedUser.id);

      // Close modal
      setModalOpen(false);

      setSelectedUser(null);

      // Refresh
      await fetchUsers(currentPage);
    } catch (error) {
      console.error("Delete user error:", error);

      alert(error?.message || "Failed to delete user.");
    } finally {
      setSaving(false);

      setDeletingId(null);
    }
  };

  // =========================================
  // CLOSE MODAL
  // =========================================
  const handleCloseModal = () => {
    if (saving) {
      return;
    }

    setModalOpen(false);

    setSelectedUser(null);

    setModalMode("view");

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
      status: "",
    });
  };

  // =========================================
  // FILTER
  // =========================================
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        user.name?.toLowerCase().includes(searchText) ||
        user.email?.toLowerCase().includes(searchText);

      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  // =========================================
  // PREVIOUS
  // =========================================
  const handlePrevious = () => {
    if (currentPage > 1) {
      fetchUsers(currentPage - 1);
    }
  };

  // =========================================
  // NEXT
  // =========================================
  const handleNext = () => {
    if (pagination && currentPage < pagination.last_page) {
      fetchUsers(currentPage + 1);
    }
  };

  // =========================================
  // ADD USER
  // =========================================
  const handleAdd = () => {
    navigate("/super-admin/users/create");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <UsersHeader
        loading={loading}
        onRefresh={() => fetchUsers(currentPage)}
        onAdd={handleAdd}
      />

      {/* STATS */}
      <UsersStats users={users} />

      {/* FILTER */}
      <UsersFilter
        search={search}
        setSearch={setSearch}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* TABLE */}
      <UsersTable
        users={filteredUsers}
        loading={loading}
        deletingId={deletingId}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* PAGINATION */}
      <UsersPagination
        pagination={pagination}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      {/* MODAL */}
      <UserModal
        open={modalOpen}
        user={selectedUser}
        mode={modalMode}
        formData={formData}
        saving={saving}
        onClose={handleCloseModal}
        onChange={handleChange}
        onSubmit={handleUpdate}
        onEdit={() => {
          if (selectedUser) {
            handleEdit(selectedUser);
          }
        }}
        onDelete={() => {
          if (modalMode === "view") {
            handleDelete(selectedUser);
          } else if (modalMode === "delete") {
            handleConfirmDelete();
          }
        }}
      />
    </div>
  );
};

export default Users;
