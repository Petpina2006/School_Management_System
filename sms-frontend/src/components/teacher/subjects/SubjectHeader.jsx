export default function SubjectHeader({ count = 0 }) {
    return (
        <div className="flex items-center justify-between">

            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    My Subjects
                </h1>

                <p className="text-sm text-slate-500">
                    Subjects you teach.
                </p>
            </div>

            <div className="rounded-xl bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-600">
                {count} Subjects
            </div>

        </div>
    );
}