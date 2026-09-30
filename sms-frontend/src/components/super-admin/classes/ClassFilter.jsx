import { Search, X } from "lucide-react";

const ClassFilter = ({
  search,
  setSearch,
  gradeFilter,
  setGradeFilter,
  academicYearFilter,
  setAcademicYearFilter,
}) => {
  const clearFilters = () => {
    setSearch("");
    setGradeFilter("all");
    setAcademicYearFilter("all");
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* SEARCH */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search class, grade or room..."
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* GRADE */}
        <select
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="all">All Grades</option>

          <option value="Grade 7">Grade 7</option>

          <option value="Grade 8">Grade 8</option>

          <option value="Grade 9">Grade 9</option>

          <option value="Grade 10">Grade 10</option>

          <option value="Grade 11">Grade 11</option>

          <option value="Grade 12">Grade 12</option>
        </select>

        {/* ACADEMIC YEAR */}
        <input
          type="text"
          value={academicYearFilter === "all" ? "" : academicYearFilter}
          onChange={(e) => setAcademicYearFilter(e.target.value || "all")}
          placeholder="Academic Year..."
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {/* CLEAR */}
        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
        >
          <X size={17} />
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default ClassFilter;
