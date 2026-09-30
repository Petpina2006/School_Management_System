import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ============================================================
// REUSABLE DONUT CHART CARD
// ============================================================

const DashboardChartCard = ({
  title,
  description,
  data,
  colors,
  total,
  totalLabel,
}) => {
  const hasData = data.some((item) => item.value > 0);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-50 opacity-70 blur-2xl transition-all duration-300 group-hover:scale-125" />

      {/* Header */}
      <div className="relative z-10 mb-2">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-800">
              {title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          </div>

          {/* Small menu button */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <span className="text-lg">•••</span>
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-[280px] w-full">
        {!hasData ? (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-8 border-slate-100">
              <span className="text-xl font-bold text-slate-300">
                0
              </span>
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-500">
              No data available
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Data will appear here when available
            </p>
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="48%"
                  innerRadius={72}
                  outerRadius={105}
                  paddingAngle={3}
                  cornerRadius={6}
                  stroke="none"
                >
                  {data.map((item, index) => (
                    <Cell
                      key={`${title}-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  cursor={false}
                  contentStyle={{
                    borderRadius: "14px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#ffffff",
                    boxShadow:
                      "0 10px 30px rgba(15, 23, 42, 0.10)",
                    padding: "10px 14px",
                  }}
                  formatter={(value, name) => [
                    Number(value).toLocaleString(),
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center content */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold tracking-tight text-slate-800">
                {Number(total).toLocaleString()}
              </span>

              <span className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                {totalLabel}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Legend */}
      {hasData && (
        <div className="mt-2 grid grid-cols-2 gap-3">
          {data.map((item, index) => {
            const color = colors[index % colors.length];

            const percentage =
              total > 0
                ? ((item.value / total) * 100).toFixed(1)
                : 0;

            return (
              <div
                key={`${title}-legend-${index}`}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                  />

                  <span className="truncate text-xs font-medium text-slate-600">
                    {item.name}
                  </span>
                </div>

                <span className="ml-2 text-xs font-bold text-slate-800">
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

const Charts = ({ dashboard }) => {
  // Support both:
  // dashboard
  // dashboard.data
  const data = dashboard?.data ?? dashboard ?? {};

  // ==========================================================
  // SCHOOL OVERVIEW
  // ==========================================================

  const totalStudents = Number(
    data?.total_students ?? 0
  );

  const totalTeachers = Number(
    data?.total_teachers ?? 0
  );

  const totalClasses = Number(
    data?.total_classes ?? 0
  );

  const totalSubjects = Number(
    data?.total_subjects ?? 0
  );

  const overviewData = [
    {
      name: "Students",
      value: totalStudents,
    },
    {
      name: "Teachers",
      value: totalTeachers,
    },
    {
      name: "Classes",
      value: totalClasses,
    },
    {
      name: "Subjects",
      value: totalSubjects,
    },
  ];

  const overviewTotal =
    totalStudents +
    totalTeachers +
    totalClasses +
    totalSubjects;

  // ==========================================================
  // SCHOOL ACTIVITIES
  // ==========================================================

  const totalScores = Number(
    data?.total_scores ?? 0
  );

  const totalAttendance = Number(
    data?.total_attendance ?? 0
  );

  const totalEnrollments = Number(
    data?.total_enrollments ?? 0
  );

  const activityData = [
    {
      name: "Scores",
      value: totalScores,
    },
    {
      name: "Attendance",
      value: totalAttendance,
    },
    {
      name: "Enrollments",
      value: totalEnrollments,
    },
  ];

  const activityTotal =
    totalScores +
    totalAttendance +
    totalEnrollments;

  // ==========================================================
  // USER DISTRIBUTION
  // ==========================================================

  const totalUsers = Number(
    data?.total_users ?? 0
  );

  const otherUsers = Math.max(
    0,
    totalUsers - totalStudents - totalTeachers
  );

  const userData = [
    {
      name: "Students",
      value: totalStudents,
    },
    {
      name: "Teachers",
      value: totalTeachers,
    },
    {
      name: "Other Users",
      value: otherUsers,
    },
  ];

  // ==========================================================
  // COLORS
  // ==========================================================

  const OVERVIEW_COLORS = [
    "#2563eb",
    "#8b5cf6",
    "#06b6d4",
    "#f59e0b",
  ];

  const ACTIVITY_COLORS = [
    "#10b981",
    "#3b82f6",
    "#f97316",
  ];

  const USER_COLORS = [
    "#2563eb",
    "#8b5cf6",
    "#64748b",
  ];

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      {/* ======================================================
          SCHOOL OVERVIEW
      ====================================================== */}

      <DashboardChartCard
        title="School Overview"
        description="Overview of school resources"
        data={overviewData}
        colors={OVERVIEW_COLORS}
        total={overviewTotal}
        totalLabel="Total"
      />

      {/* ======================================================
          SCHOOL ACTIVITIES
      ====================================================== */}

      <DashboardChartCard
        title="School Activities"
        description="Academic activities in the system"
        data={activityData}
        colors={ACTIVITY_COLORS}
        total={activityTotal}
        totalLabel="Activities"
      />

      {/* ======================================================
          USER DISTRIBUTION
      ====================================================== */}

      <DashboardChartCard
        title="User Distribution"
        description="Users by account type"
        data={userData}
        colors={USER_COLORS}
        total={totalUsers}
        totalLabel="Users"
      />
    </div>
  );
};

export default Charts;