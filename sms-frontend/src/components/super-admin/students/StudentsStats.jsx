import {
    Users,
    UserCheck,
    UserX,
} from "lucide-react";

const StudentsStats = ({
    students = [],
    pagination = null,
}) => {

    const total = pagination?.total ?? 0;

    const active = students.filter(
        (student) =>
            student.status === "active"
    ).length;

    const inactive = students.filter(
        (student) =>
            student.status === "inactive"
    ).length;

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* Total */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-sm text-gray-500">
                            Total Students
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-gray-800">
                            {total}
                        </h2>
                    </div>

                    <div className="rounded-xl bg-blue-100 p-3">
                        <Users
                            size={22}
                            className="text-blue-600"
                        />
                    </div>

                </div>

            </div>


            {/* Active */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-sm text-gray-500">
                            Active Students
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-gray-800">
                            {active}
                        </h2>
                    </div>

                    <div className="rounded-xl bg-emerald-100 p-3">
                        <UserCheck
                            size={22}
                            className="text-emerald-600"
                        />
                    </div>

                </div>

            </div>


            {/* Inactive */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-sm text-gray-500">
                            Inactive Students
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-gray-800">
                            {inactive}
                        </h2>
                    </div>

                    <div className="rounded-xl bg-red-100 p-3">
                        <UserX
                            size={22}
                            className="text-red-600"
                        />
                    </div>

                </div>

            </div>

        </div>
    );
};

export default StudentsStats;