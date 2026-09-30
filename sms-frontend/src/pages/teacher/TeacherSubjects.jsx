import { useEffect, useState } from "react";

import SubjectHeader from "../../components/teacher/subjects/SubjectHeader";
import SubjectTable from "../../components/teacher/subjects/SubjectTable";

import { getTeacherSubjects } from "../../services/teachers/teacherApi";

export default function TeacherSubjects() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSubjects = async () => {
            try {
                const response = await getTeacherSubjects();

                setSubjects(response?.data ?? response ?? []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadSubjects();
    }, []);

    return (
        <div className="space-y-6">

            <SubjectHeader count={subjects.length} />

            {loading ? (
                <p className="text-slate-500">
                    Loading subjects...
                </p>
            ) : (
                <SubjectTable subjects={subjects} />
            )}

        </div>
    );
}