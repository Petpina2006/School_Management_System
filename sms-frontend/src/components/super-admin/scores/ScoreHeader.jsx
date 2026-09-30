import { Plus, RefreshCw } from "lucide-react";

const ScoreHeader = ({ onRefresh, onAdd }) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Score Management</h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage student scores and academic results
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onRefresh}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
        >
          <RefreshCw size={17} />
          Refresh
        </button>

        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={17} />
          Add Score
        </button>
      </div>
    </div>
  );
};

export default ScoreHeader;
