export default function StudentFilter({
    search,
    setSearch,
}) {
    return (
        <div className="rounded-2xl border bg-white p-4 shadow-sm">

            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

        </div>
    );
}