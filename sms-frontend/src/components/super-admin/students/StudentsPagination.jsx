import { ChevronLeft, ChevronRight } from "lucide-react";

const StudentsPagination = ({ pagination, onPrevious, onNext }) => {
  if (!pagination) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      {/* Showing Information */}
      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-medium text-gray-700">
          {pagination.from ?? 0}
        </span>{" "}
        to{" "}
        <span className="font-medium text-gray-700">{pagination.to ?? 0}</span>{" "}
        of{" "}
        <span className="font-medium text-gray-700">
          {pagination.total ?? 0}
        </span>{" "}
        students
      </p>

      {/* Pagination Buttons */}
      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          type="button"
          onClick={onPrevious}
          disabled={pagination.current_page <= 1}
          className="flex items-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={17} />
          Previous
        </button>

        {/* Current Page */}
        <span className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
          {pagination.current_page}
        </span>

        {/* Next */}
        <button
          type="button"
          onClick={onNext}
          disabled={pagination.current_page >= pagination.last_page}
          className="flex items-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
};

export default StudentsPagination;
