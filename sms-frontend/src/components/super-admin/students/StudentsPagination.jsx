import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const StudentsPagination = ({
    pagination,
    onPrevious,
    onNext,
}) => {

    if (!pagination) {
        return null;
    }

    const currentPage =
        pagination.current_page;

    const lastPage =
        pagination.last_page;

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white px-6 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-gray-500">

                Page{" "}

                <span className="font-semibold text-gray-800">
                    {currentPage}
                </span>

                {" "}of{" "}

                <span className="font-semibold text-gray-800">
                    {lastPage}
                </span>

                {" • "}

                Total:{" "}

                <span className="font-semibold text-gray-800">
                    {pagination.total}
                </span>

            </p>


            <div className="flex gap-2">

                <button
                    type="button"
                    onClick={onPrevious}
                    disabled={currentPage <= 1}
                    className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronLeft size={17} />

                    Previous
                </button>


                <button
                    type="button"
                    onClick={onNext}
                    disabled={
                        currentPage >= lastPage
                    }
                    className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Next

                    <ChevronRight size={17} />
                </button>

            </div>

        </div>
    );
};

export default StudentsPagination;