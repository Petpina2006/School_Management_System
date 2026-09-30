import { Search } from "lucide-react";

const ScoreFilter = ({ search, setSearch, examType, setExamType }) => {
  return (
    <div className="mb-6 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student, subject..."
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <select
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">All Exam Types</option>
          <option value="quiz">Quiz</option>
          <option value="assignment">Assignment</option>
          <option value="midterm">Midterm</option>
          <option value="final">Final</option>
        </select>
      </div>
    </div>
  );
};

export default ScoreFilter;
