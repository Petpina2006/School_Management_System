import {
  ClipboardList,
  CheckCircle2,
  GraduationCap,
  XCircle,
} from "lucide-react";

const EnrollmentStats = ({ enrollments = [] }) => {
  const total = enrollments.length;

  const active = enrollments.filter((item) => item.status === "active").length;

  const completed = enrollments.filter(
    (item) => item.status === "completed",
  ).length;

  const cancelled = enrollments.filter(
    (item) => item.status === "cancelled",
  ).length;

  const stats = [
    {
      label: "Total",
      value: total,
      icon: ClipboardList,
      iconClass: "bg-indigo-100 text-indigo-600",
    },
    {
      label: "Active",
      value: active,
      icon: CheckCircle2,
      iconClass: "bg-green-100 text-green-600",
    },
    {
      label: "Completed",
      value: completed,
      icon: GraduationCap,
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      label: "Cancelled",
      value: cancelled,
      icon: XCircle,
      iconClass: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.label}
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconClass}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EnrollmentStats;
