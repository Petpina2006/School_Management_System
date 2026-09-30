
import {
    School,
} from "lucide-react";

const ClassStats = ({ classes = [] }) => {

    const total = classes.length;

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* TOTAL */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-sm text-gray-500">
                            Total Classes
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-gray-800">
                            {total}
                        </h2>
                    </div>

                    <div className="rounded-xl bg-blue-100 p-3">
                        <School
                            size={22}
                            className="text-blue-600"
                        />
                    </div>

                </div>
            </div>

            {/* INFORMATION */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-sm text-gray-500">
                            Assigned Teachers
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-gray-800">
                            {new Set(
                                classes
                                    .map((item) => item.teacher_id)
                                    .filter(Boolean)
                            ).size}
                        </h2>
                    </div>

                    <div className="rounded-xl bg-emerald-100 p-3">
                        <School
                            size={22}
                            className="text-emerald-600"
                        />
                    </div>

                </div>
            </div>

            {/* GRADES */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-sm text-gray-500">
                            Grades
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-gray-800">
                            {new Set(
                                classes
                                    .map((item) => item.grade)
                                    .filter(Boolean)
                            ).size}
                        </h2>
                    </div>

                    <div className="rounded-xl bg-purple-100 p-3">
                        <School
                            size={22}
                            className="text-purple-600"
                        />
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ClassStats;
