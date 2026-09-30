export default function StudentHeader({ count = 0 }) {
    return (
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    My Students
                </h1>

                <p className="text-sm text-slate-500">
                    Students assigned to your classes.
                </p>
            </div>

            <div className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                {count} Students
            </div>

        </div>
    );
}