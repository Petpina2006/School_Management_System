import { ChevronLeft, ChevronRight } from "lucide-react";

const UsersPagination = ({
  pagination,
  onPrevious,
  onNext,
}) => {
  if (!pagination) return null;

  const currentPage = pagination.current_page;
  const lastPage = pagination.last_page;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-3.5 transition-colors">
      
      {/* Text Info */}
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Page{" "}
        <span className="font-semibold text-slate-900 dark:text-slate-100">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-900 dark:text-slate-100">
          {lastPage}
        </span>

        <span className="mx-2.5 text-slate-300 dark:text-slate-700">•</span>

        Total:{" "}
        <span className="font-semibold text-slate-900 dark:text-slate-100">
          {pagination.total?.toLocaleString() ?? 0}
        </span>
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentPage <= 1}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={currentPage >= lastPage}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>

    </div>
  );
};

export default UsersPagination;