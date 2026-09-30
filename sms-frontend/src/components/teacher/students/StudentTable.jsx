export default function StudentTable({ students = [] }) {
    return (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

            <div className="overflow-x-auto">

                <table className="w-full text-left text-sm">

                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="px-6 py-4">Code</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Gender</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">

                        {students.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="px-6 py-10 text-center text-slate-500"
                                >
                                    No students found.
                                </td>
                            </tr>
                        ) : (
                            students.map((student) => (
                                <tr
                                    key={student.id}
                                    className="hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4 font-medium">
                                        {student.student_code || "-"}
                                    </td>

                                    <td className="px-6 py-4">
                                        {student.Full_name ||
                                            student.full_name ||
                                            student.name ||
                                            "-"}
                                    </td>

                                    <td className="px-6 py-4">
                                        {student.gender || "-"}
                                    </td>

                                    <td className="px-6 py-4">
                                        {student.phone || "-"}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                            {student.status || "active"}
                                        </span>
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