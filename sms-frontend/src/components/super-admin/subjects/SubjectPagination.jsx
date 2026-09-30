import { ChevronLeft, ChevronRight } from "lucide-react";

const SubjectPagination = ({ pagination, onPrevious, onNext }) => {
  if (!pagination) {
    return null;
  }

  const currentPage = pagination.current_page;
  const lastPage = pagination.last_page;

  return (
    <div className="mt-4 flex flex-col gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-500">
        Showing page{" "}
        <span className="font-semibold text-gray-700">{currentPage}</span> of{" "}
        <span className="font-semibold text-gray-700">{lastPage}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrevious}
          disabled={currentPage <= 1}
          className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={17} />
          Previous
        </button>

        <span className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
          {currentPage}
        </span>

        <button
          onClick={onNext}
          disabled={currentPage >= lastPage}
          className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
};

export default SubjectPagination;
