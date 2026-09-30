import { BookOpen, CheckCircle, XCircle } from "lucide-react";

const SubjectStats = ({ subjects = [] }) => {
  const total = subjects.length;

  const active = subjects.filter(
    (subject) => subject.status === "active",
  ).length;

  const inactive = subjects.filter(
    (subject) => subject.status === "inactive",
  ).length;

  const stats = [
    {
      title: "Total Subjects",
      value: total,
      icon: BookOpen,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Active",
      value: active,
      icon: CheckCircle,
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Inactive",
      value: inactive,
      icon: XCircle,
      bg: "bg-red-50",
      text: "text-red-600",
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-800">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.text}`}
              >
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubjectStats;
