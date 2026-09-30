import { useEffect, useState } from "react";

import StudentHeader from "../../components/teacher/students/StudentHeader";
import StudentFilter from "../../components/teacher/students/StudentFilter";
import StudentTable from "../../components/teacher/students/StudentTable";

import { getTeacherStudents } from "../../services/teachers/teacherApi";

export default function TeacherStudents() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStudents = async () => {
            try {
                const response = await getTeacherStudents();

                setStudents(response?.data ?? response ?? []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadStudents();
    }, []);

    const filteredStudents = students.filter((student) => {
        const name =
            student.Full_name ||
            student.full_name ||
            student.name ||
            "";

        const code = student.student_code || "";

        return `${name} ${code}`
            .toLowerCase()
            .includes(search.toLowerCase());
    });

    return (
        <div className="space-y-6">

            <StudentHeader count={filteredStudents.length} />

            <StudentFilter
                search={search}
                setSearch={setSearch}
            />

            {loading ? (
                <p className="text-slate-500">
                    Loading students...
                </p>
            ) : (
                <StudentTable students={filteredStudents} />
            )}

        </div>
    );
}