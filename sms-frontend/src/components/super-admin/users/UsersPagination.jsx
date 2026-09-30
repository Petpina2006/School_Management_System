import { ChevronLeft, ChevronRight } from "lucide-react";

const UsersPagination = ({ pagination, onPrevious, onNext }) => {
  if (!pagination) {
    return null;
  }

  const currentPage = pagination.current_page;
  const lastPage = pagination.last_page;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      {/* Showing Information */}
      <p className="text-sm text-gray-500">
        Page <span className="font-medium text-gray-700">{currentPage}</span> of{" "}
        <span className="font-medium text-gray-700">{lastPage}</span>{" "}
        <span className="mx-2 text-gray-300">•</span>
        Total:{" "}
        <span className="font-medium text-gray-700">
          {pagination.total?.toLocaleString() ?? 0}
        </span>{" "}
        users
      </p>

      {/* Pagination Buttons */}
      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentPage <= 1}
          className="flex items-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={17} />
          Previous
        </button>

        {/* Current Page */}
        <span className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
          {currentPage}
        </span>

        {/* Next */}
        <button
          type="button"
          onClick={onNext}
          disabled={currentPage >= lastPage}
          className="flex items-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
};

export default UsersPagination;
