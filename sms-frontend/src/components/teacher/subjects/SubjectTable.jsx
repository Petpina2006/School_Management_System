export default function SubjectTable({ subjects = [] }) {
    return (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

            <div className="overflow-x-auto">

                <table className="w-full text-left text-sm">

                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4">#</th>
                            <th className="px-6 py-4">Subject</th>
                            <th className="px-6 py-4">Code</th>
                            <th className="px-6 py-4">Description</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">

                        {subjects.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="px-6 py-10 text-center text-slate-500"
                                >
                                    No subjects found.
                                </td>
                            </tr>
                        ) : (
                            subjects.map((subject, index) => (
                                <tr key={subject.id}>
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-4 font-semibold">
                                        {subject.subject_name ||
                                            subject.name ||
                                            "-"}
                                    </td>

                                    <td className="px-6 py-4">
                                        {subject.subject_code || "-"}
                                    </td>

                                    <td className="px-6 py-4 text-slate-500">
                                        {subject.description || "-"}
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}