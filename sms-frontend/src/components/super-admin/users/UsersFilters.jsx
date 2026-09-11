
import { Search, X } from "lucide-react";

const StudentsFilter = ({
    search,
    setSearch,
    genderFilter,
    setGenderFilter,
    statusFilter,
    setStatusFilter,
}) => {
    // =========================================
    // CLEAR FILTERS
    // =========================================
    const clearFilters = () => {
        setSearch("");
        setGenderFilter("all");
        setStatusFilter("all");
    };

    return (
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

                {/* =========================================
                    SEARCH
                ========================================= */}
                <div className="relative">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search name, code or phone..."
                        className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {/* =========================================
                    GENDER
                ========================================= */}
                <select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value="all">All Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                {/* =========================================
                    STATUS
                ========================================= */}
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                {/* =========================================
                    CLEAR FILTER
                ========================================= */}
                <button
                    type="button"
                    onClick={clearFilters}
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                >
                    <X size={17} />
                    Clear Filters
                </button>

            </div>
        </div>
    );
};

export default StudentsFilter;
