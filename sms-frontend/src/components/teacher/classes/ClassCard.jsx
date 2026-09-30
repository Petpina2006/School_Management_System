export default function ClassCard({ item }) {
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex items-start justify-between">

                <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                        🏫
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-800">
                        {item.class_name || "Class"}
                    </h3>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Active
                </span>

            </div>

            <div className="mt-5 space-y-2 text-sm text-slate-500">

                <p>
                    Grade:{" "}
                    <span className="font-medium text-slate-800">
                        {item.grade || "-"}
                    </span>
                </p>

                <p>
                    Section:{" "}
                    <span className="font-medium text-slate-800">
                        {item.section || "-"}
                    </span>
                </p>

                <p>
                    Room:{" "}
                    <span className="font-medium text-slate-800">
                        {item.room || "-"}
                    </span>
                </p>

                <p>
                    Academic Year:{" "}
                    <span className="font-medium text-slate-800">
                        {item.academic_year || "-"}
                    </span>
                </p>

            </div>

        </div>
    );
}