import { BookOpen, Plus, RefreshCw } from "lucide-react";

const SubjectHeader = ({ onRefresh, onAdd, loading }) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <BookOpen size={22} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">Subjects</h1>
          <p className="text-sm text-gray-500">Manage all school subjects</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>

        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Subject
        </button>
      </div>
    </div>
  );
};

export default SubjectHeader;
