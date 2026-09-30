
import {
    BookOpen,
    Plus,
    RefreshCw,
} from "lucide-react";

const ClassHeader = ({
    onRefresh,
    onAdd,
    loading = false,
}) => {
    return (
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

            {/* TITLE */}
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-100 p-3">
                    <BookOpen
                        size={26}
                        className="text-blue-600"
                    />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Classes Management
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage all classes in the school system
                    </p>
                </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">

                <button
                    type="button"
                    onClick={onRefresh}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <RefreshCw
                        size={17}
                        className={loading ? "animate-spin" : ""}
                    />

                    Refresh
                </button>

                <button
                    type="button"
                    onClick={onAdd}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                >
                    <Plus size={18} />

                    Add Class
                </button>

            </div>
        </div>
    );
};

export default ClassHeader;
