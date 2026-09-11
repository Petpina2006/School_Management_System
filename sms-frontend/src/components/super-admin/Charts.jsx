import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const Charts = ({ dashboard }) => {
    const overviewData = [
        {
            name: "Students",
            value: dashboard?.total_students ?? 0,
        },
        {
            name: "Teachers",
            value: dashboard?.total_teachers ?? 0,
        },
        {
            name: "Classes",
            value: dashboard?.total_classes ?? 0,
        },
        {
            name: "Subjects",
            value: dashboard?.total_subjects ?? 0,
        },
    ];

    const activityData = [
        {
            name: "Scores",
            value: dashboard?.total_scores ?? 0,
        },
        {
            name: "Attendance",
            value: dashboard?.total_attendance ?? 0,
        },
        {
            name: "Enrollments",
            value: dashboard?.total_enrollments ?? 0,
        },
    ];

    const userData = [
        {
            name: "Students",
            value: dashboard?.total_students ?? 0,
        },
        {
            name: "Teachers",
            value: dashboard?.total_teachers ?? 0,
        },
        {
            name: "Other Users",
            value:
                Math.max(
                    0,
                    (dashboard?.total_users ?? 0) -
                        (dashboard?.total_students ?? 0) -
                        (dashboard?.total_teachers ?? 0)
                ),
        },
    ];

    return (
        <div className="space-y-6">

            {/* =========================================
                BAR CHART
            ========================================= */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-gray-800">
                        School Overview
                    </h2>

                    <p className="text-sm text-gray-500">
                        Students, teachers, classes and subjects
                    </p>
                </div>

                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={overviewData}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="name" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Bar
                                dataKey="value"
                                name="Total"
                                fill="#2563eb"
                                radius={[6, 6, 0, 0]}
                            />

                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* =========================================
                ACTIVITY CHART
            ========================================= */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-gray-800">
                        School Activities
                    </h2>

                    <p className="text-sm text-gray-500">
                        Scores, attendance and enrollments
                    </p>
                </div>

                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={activityData}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="name" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="value"
                                name="Total"
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={{ r: 5 }}
                                activeDot={{ r: 7 }}
                            />

                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* =========================================
                PIE CHART
            ========================================= */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-gray-800">
                        User Distribution
                    </h2>

                    <p className="text-sm text-gray-500">
                        Distribution of users in the system
                    </p>
                </div>

                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>

                            <Pie
                                data={userData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                label
                            >
                                {userData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            [
                                                "#10b981",
                                                "#8b5cf6",
                                                "#64748b",
                                            ][index]
                                        }
                                    />
                                ))}
                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default Charts;