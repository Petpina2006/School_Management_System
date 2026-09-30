import { useEffect, useState } from "react";

import ClassHeader from "../../components/teacher/classes/ClassHeader";
import ClassCard from "../../components/teacher/classes/ClassCard";

import { getTeacherClasses } from "../../services/teachers/teacherApi";

export default function TeacherClasses() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadClasses = async () => {
            try {
                const response = await getTeacherClasses();

                setClasses(response?.data ?? response ?? []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadClasses();
    }, []);

    return (
        <div className="space-y-6">

            <ClassHeader count={classes.length} />

            {loading ? (
                <p className="text-slate-500">
                    Loading classes...
                </p>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                    {classes.length === 0 ? (
                        <div className="rounded-2xl border bg-white p-10 text-center text-slate-500 md:col-span-2 xl:col-span-3">
                            No classes assigned.
                        </div>
                    ) : (
                        classes.map((item) => (
                            <ClassCard
                                key={item.id}
                                item={item}
                            />
                        ))
                    )}

                </div>
            )}

        </div>
    );
}