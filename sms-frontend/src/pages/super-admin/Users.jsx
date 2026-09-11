import { useEffect, useState } from "react";

import { X, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
// ============================================
// API
// ============================================

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userApi";

// ============================================
// COMPONENTS
// ============================================

import UsersHeader from "../../components/super-admin/users/UsersHeader";

import UsersStats from "../../components/super-admin/users/UsersStats";

import UsersFilters from "../../components/super-admin/users/UsersFilters";

import UsersTable from "../../components/super-admin/users/UsersTable";

import UsersPagination from "../../components/super-admin/users/UsersPagination";

import UserModal from "../../components/super-admin/users/UserModal";

const Users = () => {
  // =====================================================
  // USERS STATE
  // =====================================================
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =====================================================
  // FILTER STATE
  // =====================================================

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("all");

  const [statusFilter, setStatusFilter] = useState("all");

  // =====================================================
  // MODAL STATE
  // =====================================================

  const [showModal, setShowModal] = useState(false);

  const [editingUser, setEditingUser] = useState(null);

  const [saving, setSaving] = useState(false);

  // =====================================================
  // DELETE STATE
  // =====================================================

  const [deletingId, setDeletingId] = useState(null);

  // =====================================================
  // PAGINATION STATE
  // =====================================================

  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] = useState(null);

  // =====================================================
  // FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    status: "active",
  });

  // =====================================================
  // GET USERS
  // =====================================================

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);

      setError("");

      const result = await getUsers(page);

      console.log("Users:", result);

      // ---------------------------------------------
      // CHECK STATUS
      // ---------------------------------------------

      if (!result?.status) {
        throw new Error(result?.message || "Failed to fetch users");
      }

      // ---------------------------------------------
      // RESPONSE DATA
      // ---------------------------------------------

      const responseData = result.data;

      // ---------------------------------------------
      // ARRAY RESPONSE
      // ---------------------------------------------

      if (Array.isArray(responseData)) {
        setUsers(responseData);

        setPagination(null);
      }

      // ---------------------------------------------
      // PAGINATION RESPONSE
      // ---------------------------------------------
      else {
        setUsers(responseData?.data || []);

        setPagination(responseData);
      }
    } catch (err) {
      console.error("Fetch Users Error:", err);

      setError(err?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  // =====================================================
  // ADD USER
  // =====================================================

  const handleAdd = () => {
    setEditingUser(null);

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "student",
      status: "active",
    });

    setError("");

    setShowModal(true);
  };

  // =====================================================
  // EDIT USER
  // =====================================================

  const handleEdit = (user) => {
    setEditingUser(user);

    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "student",
      status: user.status || "active",
    });

    setError("");

    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleCloseModal = () => {
    if (saving) return;

    setShowModal(false);

    setEditingUser(null);
  };

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // CREATE / UPDATE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      setError("");

      // =================================================
      // CREATE USER
      // =================================================

      if (!editingUser) {
        const result = await createUser(formData);

        if (!result?.status) {
          throw new Error(result?.message || "Failed to create user");
        }
      }

      // =================================================
      // UPDATE USER
      // =================================================
      else {
        const updateData = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
        };

        // ---------------------------------------------
        // PASSWORD
        // ---------------------------------------------

        if (formData.password.trim()) {
          updateData.password = formData.password;
        }

        const result = await updateUser(editingUser.id, updateData);

        if (!result?.status) {
          throw new Error(result?.message || "Failed to update user");
        }
      }

      // =================================================
      // SUCCESS
      // =================================================

      setShowModal(false);

      setEditingUser(null);

      // =================================================
      // REFRESH
      // =================================================

      await fetchUsers(currentPage);
    } catch (err) {
      console.error("Save User Error:", err);

      setError(err?.message || "Failed to save user");
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE USER
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      setError("");

      const result = await deleteUser(id);

      if (!result?.status) {
        throw new Error(result?.message || "Failed to delete user");
      }

      await fetchUsers(currentPage);
    } catch (err) {
      console.error("Delete User Error:", err);

      setError(err?.message || "Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredUsers = users.filter((user) => {
    const searchValue = search.trim().toLowerCase();

    // ---------------------------------------------
    // SEARCH
    // ---------------------------------------------

    const matchesSearch =
      !searchValue ||
      user.name?.toLowerCase().includes(searchValue) ||
      user.email?.toLowerCase().includes(searchValue);

    // ---------------------------------------------
    // ROLE
    // ---------------------------------------------

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    // ---------------------------------------------
    // STATUS
    // ---------------------------------------------

    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="space-y-6">
      {/* =================================================
                HEADER
            ================================================= */}

      <UsersHeader
        onRefresh={() => fetchUsers(currentPage)}
        onAdd={() => navigate("/super-admin/users/create")}
        loading={loading}
      />

      {/* =================================================
                ERROR
            ================================================= */}

      {error && (
        <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-3">
            <XCircle size={20} className="text-red-600" />

            <p className="text-sm text-red-600">{error}</p>
          </div>

          <button
            type="button"
            onClick={() => setError("")}
            className="rounded-lg p-1 text-red-500 transition hover:bg-red-100 hover:text-red-700"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* =================================================
                STATS
            ================================================= */}

      <UsersStats users={users} />

      {/* =================================================
                FILTERS
            ================================================= */}

      <UsersFilters
        search={search}
        setSearch={setSearch}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* =================================================
                TABLE
            ================================================= */}

      {loading ? (
        <div className="rounded-xl border border-gray-100 bg-white p-12 text-center shadow-sm">
          <p className="text-sm text-gray-500">Loading users...</p>
        </div>
      ) : (
        <UsersTable
          users={filteredUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      )}

      {/* =================================================
                PAGINATION
            ================================================= */}

      <UsersPagination
        pagination={pagination}
        onPrevious={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        onNext={() =>
          setCurrentPage((prev) =>
            Math.min(pagination?.last_page || prev, prev + 1),
          )
        }
      />

      {/* =================================================
                MODAL
            ================================================= */}

      <UserModal
        open={showModal}
        editingUser={editingUser}
        formData={formData}
        saving={saving}
        onClose={handleCloseModal}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Users;
