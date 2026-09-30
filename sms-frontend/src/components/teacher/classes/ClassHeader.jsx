export default function ClassHeader({ count = 0 }) {
    return (
        <div className="flex items-center justify-between">

            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    My Classes
                </h1>

                <p className="text-sm text-slate-500">
                    Classes assigned to you.
                </p>
            </div>

            <div className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                {count} Classes
            </div>

        </div>
    );
}